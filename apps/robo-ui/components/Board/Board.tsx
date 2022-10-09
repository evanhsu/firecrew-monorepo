import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import useDeviceTouchscreenDetector from '../../components/use-device-touchscreen-detector/use-device-touchscreen-detector';
import HeaderRow from '../header-row/header-row';
import Row from '../row/row';

export interface BoardProps {
  board: any;
  boardState: any;
  columnHeaders: string[];
  loading: boolean;
  error?: { message: string } /*ApolloError*/ | undefined;
}

const StyledBoard = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export function Board(props: BoardProps) {
  const { board, boardState, columnHeaders, loading = false, error } = props;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(`Error loading data: ${props.error}`);
    return <div>Error: {error.message}</div>;
  }

  // Return early if there's no data
  if (!boardState) {
    return renderBoard(board, columnHeaders, []);
  }

  const boardRows = boardState.rows.map((row: any, index: number) => {
    const person = {
      id: row.person.id,
      name: row.person.name,
    };
    return (
      <Row
        person={person}
        activeColumn={row.activeColumn}
        index={index}
        key={person.id}
      />
    );
  });

  return renderBoard(board, columnHeaders, boardRows);
}

const renderBoard = (
  board: any,
  headers: string[],
  boardRows: JSX.Element[]
) => (
  <div>
    <h1>{board.name}</h1>
    <HeaderRow headers={headers} />
    {boardRows.length > 0 ? (
      <StyledBoard>{boardRows}</StyledBoard>
    ) : (
      <div>This Board is empty</div>
    )}
  </div>
);

const BoardWithData = () => {
  const deviceHasTouchscreen = useDeviceTouchscreenDetector();
  return (
    <DndProvider backend={deviceHasTouchscreen ? HTML5Backend : TouchBackend}>
      <StyledBoard>
        <h1>
          Welcome to Boardddd! This device{' '}
          {deviceHasTouchscreen ? 'has' : 'does not have'} a touchscreen
        </h1>
      </StyledBoard>
    </DndProvider>
  );
};

export default BoardWithData;
