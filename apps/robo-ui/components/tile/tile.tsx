import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDrag } from 'react-dnd';
import palette from '../../theme/palette';

export interface TileProps {
    primaryText: string;
    secondaryText?: string;
    /**
     * The Tile ID is the same as the ID of the Person represented by this Tile
     */
    id: string;
    position: {
        row: number;
        column: number;
    };
}

export const StyledTile = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'isDragging',
})<{ isDragging?: boolean }>(({ theme, isDragging = false }) => ({
    // border: isDragging ? `2px dashed ${palette.dark.main}` : 'none',
    boxShadow: `1px 2px 3px ${palette.dark.main}`,
    flex: 1,
    width: 80, // The "flex: 1" (above) allows the Tile to stretch to the width of the column, but this is necessary to constrain the text
    backgroundColor: isDragging
        ? theme.palette.primary.light
        : theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    padding: 5,
    opacity: isDragging ? 0.4 : 1.0,
}));

// export const StyledTileOutline = styled((props) => (
//     <Paper {...props} variant="outlined" />
// ))({
//     flex: 1,
//     border: `2px dashed ${palette.dark.main}`,
//     display: 'flex',
//     flexDirection: 'column',
// });

const PrimaryText = styled('span')(({ theme }) => ({
    fontSize: '1.0em',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.4em',
    },
    flex: 1,
    color: theme.palette.primary.contrastText,
}));

const SecondaryText = styled('span')(({ theme }) => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontSize: '0.7em',
    [theme.breakpoints.up('sm')]: {
        fontSize: '0.9em',
    },
    flex: 1,
    color: theme.palette.primary.contrastText,
}));

export function Tile(props: TileProps) {
    const { primaryText, secondaryText, id, position } = props;

    const [{ isDragging }, dragRef, dragPreview] = useDrag(
        () => ({
            type: 'TILE',
            item: { id, position },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            // Using a custom isDragging method because the original component gets
            // unmounted during the dragging and later “resurrected” with a different
            // parent. We want the Tile to retain the dragged appearance—even though
            // technically, the component gets unmounted and a different one gets mounted
            // every time you move it to another cell.
            isDragging: (monitor) => id === monitor.getItem()?.id,
            // end: (draggedItem, monitor) => {
            //     if (monitor.didDrop()) {
            //         console.log(
            //             `Tile dropped: ${JSON.stringify(
            //                 draggedItem
            //             )} - Tile: {id:${id}, position:${JSON.stringify(
            //                 position
            //             )}}`
            //         );
            //     }
            // },
        }),
        [position]
    );

    isDragging && console.log(`dragging ${id}`);

    // if (isDragging) {
    //     return <StyledTileOutline></StyledTileOutline>;
    // }

    return (
        <StyledTile ref={dragRef} isDragging={isDragging}>
            <Typography variant="h3">{primaryText}</Typography>
            <Typography variant="subtitle1">{secondaryText}</Typography>
        </StyledTile>
    );
}

export default Tile;
