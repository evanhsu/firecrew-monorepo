import {
  BoardStatePartsFragment,
  GridPositionInput,
} from '@firecrew/robo-service-client';
import update from 'immutability-helper';
import { RefObject } from 'react';
import { DropTargetMonitor } from 'react-dnd';

/**
 * NextJS may attempt to do some Server-Side rendering of your React code.
 * Some code is intended to always run in the browser (e.g. websocket client) and needs a way
 * to short-circuit if it's being rendered on the server.
 *
 * @returns boolean true if currently executing server-side.
 *                  false if we're in a browser.
 */
export const isSSR = () => typeof window === 'undefined';

export const coordinatesAreEqual = (
  position1: GridPositionInput,
  position2: GridPositionInput
): boolean => {
  return (
    position1.row === position2.row && position1.column === position2.column
  );
};

export const overlapIsSufficient = (
  startPosition: GridPositionInput,
  hoverPosition: GridPositionInput,
  ref: RefObject<HTMLDivElement>,
  monitor: DropTargetMonitor
) => {
  // Don't replace items with themselves
  if (coordinatesAreEqual(startPosition, hoverPosition)) {
    return false;
  }
  if (!ref.current) {
    return false;
  }
  // Determine rectangle on screen
  const hoverBoundingRect = ref.current?.getBoundingClientRect();

  // Get vertical middle
  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  const hoverUpperQuarterY =
    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;
  const hoverLowerQuarterY = hoverUpperQuarterY * 3;

  // Determine mouse position
  const clientOffset = monitor.getClientOffset();

  // Get pixels to the top
  const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

  // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%

  // Dragging downwards
  if (
    startPosition.row < hoverPosition.row &&
    hoverClientY < hoverUpperQuarterY
  ) {
    return false;
  }

  // Dragging upwards
  if (
    startPosition.row > hoverPosition.row &&
    hoverClientY > hoverLowerQuarterY
  ) {
    return false;
  }

  return true;
};

export const moveTileOnGrid = (
  rows: BoardStatePartsFragment['rows'],
  oldPosition: GridPositionInput,
  newPosition: GridPositionInput
) => {
  const rowToBeMoved = { ...rows[oldPosition.row] };
  rowToBeMoved!.column = newPosition.column;
  const postMoveRows = update(rows, {
    // @ts-ignore
    $splice: [
      [oldPosition.row, 1],
      [newPosition.row, 0, rowToBeMoved],
    ],
  }).map((row, i) => ({
    ...row,
    row: i,
  }));

  return postMoveRows;
};
