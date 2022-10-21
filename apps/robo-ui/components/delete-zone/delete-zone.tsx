import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDrop } from 'react-dnd';
import { TileProps } from '../tile/tile';
import { useState } from 'react';
import { useRemovePersonFromBoardMutation } from '@firecrew/robo-service-client';

/* eslint-disable-next-line */
export interface DeleteZoneProps {}

const StyledDeleteZone = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.warning.light,
    height: 250,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export function DeleteZone(props: DeleteZoneProps) {
    const [hoveringTileId, setHoveringTileId] = useState<string | null>(null);
    const [removePersonFromBoard, { data }] =
        useRemovePersonFromBoardMutation();
    const [, dropRef] = useDrop<TileProps>({
        accept: 'TILE',
        hover(item, monitor) {
            if (item.id === hoveringTileId) {
                return;
            }
            setHoveringTileId(item.id);

            console.log(JSON.stringify(item));
        },
        drop(item, monitor) {
            console.log(`DROPPED on TRASH: ${item.id}`);
            removePersonFromBoard({
                variables: {
                    personId: item.id,
                    boardId: 'board-1-uuid', //TODO: get the boardId from context
                },
            });
        },
    });

    return (
        <StyledDeleteZone ref={dropRef}>
            <DeleteIcon sx={{ fontSize: 100 }} />
        </StyledDeleteZone>
    );
}

export default DeleteZone;
