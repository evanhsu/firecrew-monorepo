import styled from '@emotion/styled';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useDeviceTouchscreenDetector } from '../../components/use-device-touchscreen-detector/use-device-touchscreen-detector';

/* eslint-disable-next-line */
export interface BoardProps {}

const StyledBoard = styled.div`
  color: pink;
`;

export function Board(props: BoardProps) {
  const deviceHasTouchscreen = useDeviceTouchscreenDetector();
  return (
    <DndProvider backend={deviceHasTouchscreen ? HTML5Backend : TouchBackend}>
      <StyledBoard>
        <h1>
          Welcome to Board! This device{' '}
          {deviceHasTouchscreen ? 'has' : 'does not have'} a touchscreen
        </h1>
      </StyledBoard>
    </DndProvider>
  );
}

export default Board;
