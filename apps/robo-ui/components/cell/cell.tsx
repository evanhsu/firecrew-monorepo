import styled from '@emotion/styled';
import Tile from '../tile/tile';

export interface CellProps {
  tile?: {
    id: number;
    name: string;
  } | null;
  row: number;
  column: number;
}

const StyledCell = styled.div`
  color: pink;
`;

export function Cell(props: CellProps) {
  const { row, column, tile } = props;

  // const [moveTile] = useMutation(MOVE_TILE);
  // const [sendBoardState] = useMutation(SET_BOARD_STATE)
  // const [, drop] = useDrop({
  //     accept: 'TILE',
  //     hover(item: DragItem, monitor: DropTargetMonitor) {
  //         const startPosition = item.position;
  //         const hoverPosition = {
  //             row,
  //             column,
  //         };

  //         // Don't replace items with themselves
  //         if (coordinatesAreEqual(startPosition, hoverPosition)) {
  //             return
  //         }

  //         // Time to actually perform the action
  //         console.log(`${JSON.stringify(startPosition)}, ${JSON.stringify(hoverPosition)}`);
  //         boardState = moveTile({ variables: {startPosition, hoverPosition} });

  //         item.position = hoverPosition;
  //     },
  //     drop(item: DragItem, monitor: DropTargetMonitor) {
  //         // Send the entire board state to the API here: "mutation setBoardState"
  //         console.log('DROPPED');
  //         boardState.then((board: any) => {
  //             const trimmedRows = board.data?.moveTile?.state?.rows.map((row: any) => {
  //                 let trimmedRow = {...row}; // Clone this object
  //                 delete trimmedRow.__typename;
  //                 delete trimmedRow.person.__typename;
  //                 return trimmedRow;
  //             });

  //             // const setBoardStateResponse = sendBoardState({ variables: { boardState: trimmedRows }})
  //             // setBoardStateResponse.then((data) => console.log(data));
  //         });
  //     },
  // });

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
