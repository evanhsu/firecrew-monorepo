import styled from '@emotion/styled';
import Cell from '../cell/cell';

export interface RowProps {
  person: {
    id: string;
    name: string;
  };
  activeColumn: number;
  index: number;
}

export const StyledRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '75px',
});

export function Row(props: RowProps) {
  const { person, activeColumn, index } = props;
  const cells = [0, 1, 2].map((_, i) => {
    return (
      <Cell
        tile={i === activeColumn ? person : undefined}
        row={index}
        column={i}
        key={`${person.id}${i}`}
      />
    );
  });

  return <StyledRow>{cells}</StyledRow>;
}

export default Row;
