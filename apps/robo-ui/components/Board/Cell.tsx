import React, { FunctionComponent, CSSProperties } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { useMutation } from '@apollo/react-hooks';
import { GridCoordinate } from './Board';
import Tile from './Tile';
import { MOVE_TILE, SET_BOARD_STATE } from './typeDefs';
import Theme from '../../theme';


export type CellProps = {
    tile?: {
        id: number,
        name: string
    } | null,
    row: number,
    column: number,
};

interface DragItem {
    position: {
        row: number,
        column: number,
    },
    id: string,
    type: string,
}

const styles = {
    width: "300px",
    display: "flex",
    // backgroundColor: "#05386B",
    backgroundColor: Theme.colors.white,
    paddingTop: "2px",
    paddingBottom: "2px",
    marginLeft: "2px",
    marginRight: "2px",
    // border: "1px dashed gray",
} as CSSProperties;

const coordinatesAreEqual = (position1: GridCoordinate, position2: GridCoordinate): boolean => {
    return (position1.row === position2.row) && (position1.column === position2.column);
};

    var boardState: any;
const Cell: FunctionComponent<CellProps> = ({ tile = null, row, column }) => {
    const [moveTile] = useMutation(MOVE_TILE);
    const [sendBoardState] = useMutation(SET_BOARD_STATE)
    const [, drop] = useDrop({
        accept: 'TILE',
        hover(item: DragItem, monitor: DropTargetMonitor) {
            const startPosition = item.position;
            const hoverPosition = {
                row,
                column,
            };

            // Don't replace items with themselves
            if (coordinatesAreEqual(startPosition, hoverPosition)) {
                return
            }

            // Time to actually perform the action
            console.log(`${JSON.stringify(startPosition)}, ${JSON.stringify(hoverPosition)}`);
            boardState = moveTile({ variables: {startPosition, hoverPosition} });

            item.position = hoverPosition;
        },
        drop(item: DragItem, monitor: DropTargetMonitor) {
            // Send the entire board state to the API here: "mutation setBoardState"
            console.log('DROPPED');
            boardState.then((board: any) => {
                const trimmedRows = board.data?.moveTile?.state?.rows.map((row: any) => {
                    let trimmedRow = {...row}; // Clone this object
                    delete trimmedRow.__typename;
                    delete trimmedRow.person.__typename;
                    return trimmedRow;
                });

                // const setBoardStateResponse = sendBoardState({ variables: { boardState: trimmedRows }})
                // setBoardStateResponse.then((data) => console.log(data));
            });
        },
    });

    return (
        <div ref={drop} style={styles}>
            {tile ? (<Tile primaryText={tile.name} secondaryText={String(tile.id)} id={tile.id} position={{ row, column }} />) : ''}
        </div>
    );
}

Cell.defaultProps = {
    tile: null,
} as Partial<CellProps>;

export default Cell;
