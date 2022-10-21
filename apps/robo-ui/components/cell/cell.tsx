import { gql } from '@apollo/client';
import {
    GetBoardByGroupDocument,
    GetBoardByGroupQueryResult,
    GridPositionInput,
    useMoveTileMutation,
} from '@firecrew/robo-service-client';
import { styled } from '@mui/material/styles';
import { RefObject, useRef } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { apolloCache } from '../../apollo/cache';
import { moveTileOnGrid, overlapIsSufficient } from '../../utils/utils';
import Tile, { TileProps } from '../tile/tile';

export interface CellProps {
    tile?: {
        id: string;
        name: string;
    } | null;
    row: number;
    column: number;
}

export const StyledCell = styled('div')(({ theme }) => ({
    width: '300px',
    display: 'flex',
    backgroundColor: theme.palette.secondary.contrastText,
    paddingTop: '2px',
    paddingBottom: '2px',
    marginLeft: '2px',
    marginRight: '2px',
}));

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
        `Tile:${JSON.stringify(startPosition)}, Cell:${JSON.stringify(
            hoverPosition
        )}`
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
            // Change the value of the 'state' field...
            state(_boardState) {
                // Set the 'state.__ref' value (this is a "foreign key" reference to a BoardState object in the Apollo cache)
                // We're changing the 'ref' to point to the new BoardState that we just created above (with the writeQuery() call)
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
    const [moveTileMutation, { data, loading, error }] = useMoveTileMutation();

    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop<TileProps>({
        accept: 'TILE',
        hover(item, monitor) {
            onHover(item, { row, column }, ref, monitor);
        },
        drop(item, monitor) {
            console.log(
                `DROPPED at (${item.position?.row}, ${item.position?.column})`
            );

            moveTileMutation({
                variables: {
                    boardId: 'board-1-uuid',
                    tileId: item.id,
                    newPosition: item.position,
                },
            });

            // TODO: prune all of the "drag-*" boardstates from local cache
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
    );
}

export default Cell;
