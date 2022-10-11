import styled from '@emotion/styled';
import Tile, { TileProps } from '../tile/tile';
import theme from '../../theme';
import { DropTargetMonitor, useDrop, XYCoord } from 'react-dnd';
import {
  BoardStatePartsFragment,
  GetBoardByGroupDocument,
  GetBoardByGroupQueryResult,
  GridPositionInput,
} from '@firecrew/robo-service-client';
import { apolloCache } from '../../apollo/cache';
import { v4 as uuidv4 } from 'uuid';
import { gql } from '@apollo/client';
import update from 'immutability-helper';
import { RefObject, useRef } from 'react';

export interface CellProps {
  tile?: {
    id: string;
    name: string;
  } | null;
  row: number;
  column: number;
}

const StyledCell = styled.div({
  width: '300px',
  display: 'flex',
  backgroundColor: theme.colors.white,
  paddingTop: '2px',
  paddingBottom: '2px',
  marginLeft: '2px',
  marginRight: '2px',
});

const coordinatesAreEqual = (
  position1: GridPositionInput,
  position2: GridPositionInput
): boolean => {
  return (
    position1.row === position2.row && position1.column === position2.column
  );
};

const overlapIsSufficient = (
  startPosition: GridPositionInput,
  hoverPosition: GridPositionInput,
  ref: RefObject<HTMLDivElement>,
  monitor: DropTargetMonitor
) => {
  // Don't replace items with themselves
  if (coordinatesAreEqual(startPosition, hoverPosition)) {
    return false;
  }
  if (!ref.current) {
    return false;
  }
  // Determine rectangle on screen
  const hoverBoundingRect = ref.current?.getBoundingClientRect();

  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const hoverUpperQuarterY =
    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;
  const hoverLowerQuarterY = hoverUpperQuarterY * 3;

  // Determine mouse position
  const clientOffset = monitor.getClientOffset();

  // Get pixels to the top
  const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards
  if (
    startPosition.row < hoverPosition.row &&
    hoverClientY < hoverUpperQuarterY
  ) {
    return false;
  }

  // Dragging upwards
  if (
    startPosition.row > hoverPosition.row &&
    hoverClientY > hoverLowerQuarterY
  ) {
    return false;
  }

  return true;
};

const moveTileOnGrid = (
  rows: BoardStatePartsFragment['rows'],
  oldPosition: GridPositionInput,
  newPosition: GridPositionInput
) => {
  const rowToBeMoved = { ...rows[oldPosition.row] };
  rowToBeMoved!.column = newPosition.column;
  const postMoveRows = update(rows, {
    // @ts-ignore
    $splice: [
      [oldPosition.row, 1],
      [newPosition.row, 0, rowToBeMoved],
    ],
  }).map((row, i) => ({
    ...row,
    row: i,
  }));

  return postMoveRows;
};

interface Positionable {
  position: GridPositionInput;
}

function onHover(
  item: Positionable,
  hoverPosition: GridPositionInput,
  /**
   * The ref is used to determine if the current mouse pointer position is "deep enough"
   * into the drop zone before triggering the onHover() function.
   * Without this, the onHover() would be triggered as soon as a 'Draggable' in 1px over the
   * drop zone and can cause flickering.
   */
  ref: RefObject<HTMLDivElement>,
  monitor: DropTargetMonitor
) {
  const startPosition = { ...item.position };
  if (!overlapIsSufficient(startPosition, hoverPosition, ref, monitor)) {
    return;
  }

  console.log(
    `${JSON.stringify(startPosition)}, ${JSON.stringify(hoverPosition)}`
  );

  // TODO: Need access to the board ID - context? Or maybe just a separate cache query?
  const boardFromCacheResult = apolloCache.readQuery<
    GetBoardByGroupQueryResult['data']
  >({
    query: GetBoardByGroupDocument,
    variables: {
      groupId: 'group-1-uuid',
    },
  });

  if (!boardFromCacheResult?.getBoardByGroup[0]?.state) {
    return;
  }
  const preMoveBoard = boardFromCacheResult.getBoardByGroup[0];

  const updatedRows = moveTileOnGrid(
    preMoveBoard.state!.rows,
    startPosition,
    hoverPosition
  );

  const newBoardState = {
    __typename: 'BoardState',
    id: `drag-${uuidv4()}`, // BoardStates that were created just to track a drag can be easily identified for pruning
    revision: 0, // TODO: come up with something meaningful to put here
    createdAt: Date.now(),
    rows: updatedRows,
  };

  // Write the new BoardState to the local cache
  apolloCache.writeQuery({
    query: gql`
      query writeBoardState($newBoardStateId: ID!) {
        boardState(id: $newBoardStateId) {
          __typename
          id
          revision
          createdAt
          rows {
            __typename
            id
            row
            column
            person {
              __typename
              id
              name
              qualifications
            }
          }
        }
      }
    `,
    data: {
      boardState: newBoardState,
    },
    variables: {
      newBoardStateId: newBoardState.id,
    },
  });

  // Update the existing Board with a 'ref' to the new BoardState (the Board.state.__ref)
  apolloCache.modify({
    id: apolloCache.identify(preMoveBoard),
    fields: {
      state(_boardState) {
        return {
          __ref: apolloCache.identify(newBoardState),
        };
      },
    },
  });
  item.position = hoverPosition;
}

export function Cell(props: CellProps) {
  const { row, column, tile } = props;

  //   const [moveTile] = useMutation(MOVE_TILE);
  //   const [sendBoardState] = useMutation(SET_BOARD_STATE)
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop<TileProps>({
    accept: 'TILE',
    hover(item, monitor) {
      onHover(item, { row, column }, ref, monitor);
    },
    drop(item, monitor) {
      console.log(`DROPPED at (${item.position.row}, ${item.position.column})`);
      // TODO: prune all of the "drag-*" boardstates from local cache

      // Send the entire board state to the API here: "mutation setBoardState"
      //   boardState.then((board: any) => {
      //     const trimmedRows = board.data?.moveTile?.state?.rows.map(
      //       (row: any) => {
      //         let trimmedRow = { ...row }; // Clone this object
      //         delete trimmedRow.__typename;
      //         delete trimmedRow.person.__typename;
      //         return trimmedRow;
      //       }
      //     );

      //     // const setBoardStateResponse = sendBoardState({ variables: { boardState: trimmedRows }})
      //     // setBoardStateResponse.then((data) => console.log(data));
      //   });
    },
  });

  drop(ref);

  return (
    <StyledCell ref={ref}>
      {tile ? (
        <Tile
          primaryText={tile.name}
          secondaryText={String(tile.id)}
          id={tile.id}
          position={{ row, column }}
        />
      ) : (
        ''
      )}
    </StyledCell>
    // <div ref={drop} style={styles}>
    //     {tile ? (<Tile primaryText={tile.name} secondaryText={String(tile.id)} id={tile.id} position={{ row, column }} />) : ''}
    // </div>
  );
}

export default Cell;
