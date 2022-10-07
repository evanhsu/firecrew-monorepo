import {
  arg,
  idArg,
  inputObjectType,
  mutationField,
  nonNull,
  objectType,
} from 'nexus';
import { BoardState } from './BoardState';

// const SetBoardStateMutationResponse = objectType({
//   name: 'SetBoardStateMutationResponse',
//   definition(t) {
//     t.field('boardState', {
//       type: BoardState,
//     });
//   },
// });

// export const SetBoardState = mutationField('setBoardState', {
//   type: SetBoardStateMutationResponse,
//   args: {
//     boardId: nonNull(idArg()),
//     boardState: nonNull(BoardStateInput),
//   },
//   resolve: async (_root, args, ctx) => {
//     const boardStateInput = args.boardState;
//     const boardState = await ctx.db.setBoardState(
//       args.boardId,
//       boardStateInput
//     );

//     // pubsub.publish(BOARD_STATE_UPDATED, { boardState });

//     return {
//       boardState: boardState,
//     };
//   },
// });

const MoveTileMutationResponse = objectType({
  name: 'MoveTileMutationResponse',
  definition(t) {
    t.field('boardState', {
      type: BoardState,
    });
  },
});

export const GridPositionInput = inputObjectType({
  name: 'GridPositionInput',
  definition(t) {
    t.nonNull.int('row', {
      description:
        'The row at the very top of the Board is Row 0. The row number increases as you move down the board.',
    });
    t.nonNull.int('column', {
      description:
        'The left-most column on the Board is Column 0. The column number increases as you move to the _right_.',
    });
  },
});

export const MoveTile = mutationField('moveTile', {
  type: MoveTileMutationResponse,
  args: {
    boardId: nonNull(idArg()),
    tileId: nonNull(idArg()),
    newPosition: arg({
      type: nonNull(GridPositionInput),
      description:
        'The row/column where the Tile was positioned _after_ it was moved, i.e. the "destination"',
    }),
  },
  resolve: async (_root, args, ctx) => {
    const oldBoardState = await ctx.db.boardState(args.boardId);
    if (!oldBoardState) {
      throw new Error(
        "Can't find the previous BoardState, therefore can't derive the new BoardState..."
      );
    }

    const oldTile = oldBoardState?.rows.find((tile) => tile.id === args.tileId);
    if (!oldTile) {
      throw new Error("Can't find the Tile that was moved...");
    }
    const oldPosition = {
      row: oldTile.row,
      column: oldTile.column,
    };

    // Short circuit if there's no change to the board. This avoids creating unnecessary db
    // records and also avoids incrementing the 'revision' number on a new boardState.
    if (
      oldPosition.row === args.newPosition.row &&
      oldPosition.column === args.newPosition.column
    ) {
      return { boardState: oldBoardState };
    }

    // Copy the previous boardState as a starting point, then we'll shift the tiles around...
    const newBoardState = {
      boardId: oldBoardState.boardId,
      rows: oldBoardState.rows,
    };

    if (args.newPosition.row > oldPosition.row) {
      // The Tile moved DOWN the board
      // All tiles between the old.row and new.row (inclusive) will shift UP (decrement row)
      for (let i = oldPosition.row; i <= args.newPosition.row; i++) {
        newBoardState.rows[i].row--;
      }
    } else {
      // The Tile moved UP the board
      // All tiles between the old.row and new.row will shift DOWN (increment row)
      for (let i = args.newPosition.row; i <= oldPosition.row; i++) {
        newBoardState.rows[i].row++;
      }
    }

    // Remove the tile from its old position/row
    newBoardState.rows.splice(oldPosition.row, 1);

    // Insert the tile into its new position/row (with its new column, too)
    newBoardState.rows.splice(args.newPosition.row, 0, {
      ...oldTile,
      row: args.newPosition.row,
      column: args.newPosition.column,
    });

    // Save the new boardState - this generates a new revision number, sets the createdAt date, etc
    const persistedBoardState = await ctx.db.setBoardState(
      args.boardId,
      newBoardState
    );

    const event = await ctx.db.addTileMoveEvent({
      boardId: args.boardId,
      tileId: args.tileId,
      oldPosition: oldPosition,
      newPosition: args.newPosition,
      toBoardStateRevision: persistedBoardState.revision,
      fromBoardStateRevision: oldBoardState.revision,
    });

    console.log(JSON.stringify(event));
    // pubsub.publish(BOARD_STATE_UPDATED, { boardState });
    // pubsub.publish(TILE_MOVED, { boardState });

    return {
      boardState: persistedBoardState,
    };
  },
});
