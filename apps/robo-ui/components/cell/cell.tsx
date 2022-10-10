import styled from '@emotion/styled';
import Tile, { TileProps } from '../tile/tile';
import theme from '../../theme';
import { useDrop } from 'react-dnd';
import { GridPositionInput } from '@firecrew/robo-service-client';

export interface CellProps {
  tile?: {
    id: number;
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

export function Cell(props: CellProps) {
  const { row, column, tile } = props;

  //   const [moveTile] = useMutation(MOVE_TILE);
  //   const [sendBoardState] = useMutation(SET_BOARD_STATE)
  const [, drop] = useDrop<TileProps>({
    accept: 'TILE',
    hover(item, monitor) {
      const startPosition = item.position;
      const hoverPosition = {
        row,
        column,
      };

      // Don't replace items with themselves
      if (coordinatesAreEqual(startPosition, hoverPosition)) {
        return;
      }

      // Time to actually perform the action
      console.log(
        `${JSON.stringify(startPosition)}, ${JSON.stringify(hoverPosition)}`
      );
      //   boardState = moveTile({ variables: { startPosition, hoverPosition } });

      item.position = hoverPosition;
    },
    drop(item, monitor) {
      // Send the entire board state to the API here: "mutation setBoardState"
      console.log('DROPPED');
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

  return (
    <StyledCell>
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
