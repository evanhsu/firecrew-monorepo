import styled from '@emotion/styled';
import type { Board } from '@firecrew/robo-service-client';
import { useGetBoardByGroupQuery } from '@firecrew/robo-service-client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import BoardComponent from '../../components/board/board';
import useDeviceTouchscreenDetector from '../../components/use-device-touchscreen-detector/use-device-touchscreen-detector';

/* eslint-disable-next-line */
export interface BoardProps {}

const StyledBoard = styled.div`
  color: pink;
`;

export function Board(props: BoardProps) {
  const deviceHasTouchscreen = useDeviceTouchscreenDetector();
  const { data, loading, error } = useGetBoardByGroupQuery({
    variables: {
      groupId: 'group-1-uuid',
    },
  });

  if (error || !data?.getBoardByGroup[0]?.__typename) {
    return (
      <div>
        Can't load data {error?.message} {JSON.stringify(error)}
      </div>
    );
  }

  const { state, ...board } = { ...data?.getBoardByGroup[0] };

  return (
    <DndProvider backend={deviceHasTouchscreen ? TouchBackend : HTML5Backend}>
      <BoardComponent
        board={board}
        boardState={state}
        columnHeaders={['Available', 'Unavailable', 'Assigned']}
        loading={loading}
        error={error}
      />
    </DndProvider>
  );
}

export default Board;
