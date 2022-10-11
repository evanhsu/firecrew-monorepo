import styled from '@emotion/styled';
import { useDrag } from 'react-dnd';
import theme from '../../theme';

export interface TileProps {
  primaryText: string;
  secondaryText?: string;
  id: string;
  position: {
    row: number;
    column: number;
  };
}

const StyledTile = styled('div')<{ opacity: number }>(
  {
    // border: 3px solid ${theme.colors.dark},
    boxShadow: `1px 2px 3px ${theme.colors.dark}`,
    flex: 1,
    backgroundColor: theme.colors.primary,
    display: 'flex',
    flexDirection: 'column',
  },
  (props) => ({
    opacity: props.opacity ?? 1.0,
  })
);

const PrimaryText = styled.span`
    fontSize: "20px",
    flex: 1,
    color: Theme.colors.accent,
`;
const SecondaryText = styled.span`
    fontSize: "15px",
    flex: 1,
    color: Theme.colors.accent,
`;

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
          console.log(draggedItem);
        }
      },
    }),
    []
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
