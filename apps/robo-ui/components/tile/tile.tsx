import { styled } from '@mui/material/styles';
import { useDrag } from 'react-dnd';
import palette from '../../theme/palette';

export interface TileProps {
  primaryText: string;
  secondaryText?: string;
  id: string;
  position: {
    row: number;
    column: number;
  };
}

export const StyledTile = styled('div')<{ opacity: number }>(
  ({ theme, opacity }) => ({
    // border: 3px solid ${theme.colors.dark},
    boxShadow: `1px 2px 3px ${palette.dark.main}`,
    flex: 1,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    opacity: opacity ?? 1.0,
  })
);

const PrimaryText = styled('span')(({ theme }) => ({
  fontSize: '20px',
  flex: 1,
  color: theme.palette.primary.contrastText,
}));

const SecondaryText = styled('span')(({ theme }) => ({
  fontSize: '15px',
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
      end: (draggedItem, monitor) => {
        if (monitor.didDrop()) {
          console.log(
            `Tile dropped: ${JSON.stringify(
              draggedItem
            )} - Tile: {id:${id}, position:${JSON.stringify(position)}}`
          );
        }
      },
    }),
    [position]
  );

  isDragging && console.log(`dragging ${id}`);
  return (
    // TODO: The opacity is retained while dragging vertically, but not while dragging horizontally.
    <StyledTile ref={dragRef} opacity={isDragging ? 0.4 : 1}>
      <PrimaryText>{primaryText}</PrimaryText>
      <SecondaryText>{secondaryText}</SecondaryText>
    </StyledTile>
  );
}

export default Tile;
