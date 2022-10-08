import styled from '@emotion/styled';
import { useDrag } from 'react-dnd';
import theme from '../../theme';

export interface TileProps {
  primaryText: string;
  secondaryText?: string;
  id: number;
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

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'TILE',
      item: { id, position },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
      isDragging: (monitor) => {
        return id === monitor.getItem().id;
      },
    }),
    []
  );

  return (
    // TODO: The opacity is retained while dragging vertically, but not while dragging horizontally.
    <StyledTile ref={dragRef} opacity={opacity}>
      <PrimaryText>{primaryText}</PrimaryText>
      <SecondaryText>{secondaryText}</SecondaryText>
    </StyledTile>
  );
}

export default Tile;
