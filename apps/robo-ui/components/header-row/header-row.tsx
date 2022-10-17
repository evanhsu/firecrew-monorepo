import { styled } from '@mui/material/styles';

export interface HeaderRowProps {
  headers?: string[];
}

const StyledHeaderRow = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '75px',
}));

const StyledColumnHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  opacity: 1,
  backgroundColor: theme.palette.secondary.contrastText,
  fontSize: '30px',
  color: theme.palette.secondary.main,
  width: '300px',
  marginLeft: '2px',
  marginRight: '2px',
}));

const defaultProps = {
  headers: ['Available', 'Unavailable', 'Committed'],
};
export function HeaderRow(props: HeaderRowProps) {
  const { headers } = { ...defaultProps, ...props };

  const headerElements = headers.map((headerText: string, index: number) => (
    <StyledColumnHeader key={`${index}-${headerText}`}>
      {headerText}
    </StyledColumnHeader>
  ));

  return <StyledHeaderRow>{headerElements}</StyledHeaderRow>;
}

export default HeaderRow;
