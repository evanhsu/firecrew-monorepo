import {
  extendType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
  unionType,
} from 'nexus';
import { NotFoundError } from '../../errors/errors';
import { BoardState } from './BoardState';
import { Group } from './Group';

export const Board = objectType({
  name: 'Board',
  definition(t) {
    t.nonNull.id('id');
    t.string('name');
    t.field('group', {
      type: Group,
    });
    t.field('state', {
      type: BoardState,
      args: {
        revision: intArg(),
      },
      resolve: async (root, args, ctx) => {
        return (
          (await ctx.db.boardState(root.id, args.revision ?? undefined)) ?? null
        );
      },
    });
  },
});

// ***
// QUERIES (these fields are added to the Query root type)
// ***

export const GetBoardOutput = unionType({
  name: 'GetBoardOutput',
  definition(t) {
    t.members('Board', 'NotFoundError');
  },
  resolveType: (source) =>
    // If the object has an 'id' property, assume it's a Board. Otherwise it's a NotFoundError.
    Object.prototype.hasOwnProperty.call(source, 'id')
      ? 'Board'
      : 'NotFoundError',
});

export const GetBoardByIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getBoardById', {
      type: GetBoardOutput,
      args: {
        boardId: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        const board = await ctx.db.board(args.boardId);

        if (!board) {
          return new NotFoundError(
            `No Board found with id: ${args.boardId}`,
            'Board',
            args.boardId
          );
        }

        return board;
      },
    });
  },
});

export const GetBoardByGroupQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getBoardByGroup', {
      type: nonNull(list(Board)),
      args: {
        groupId: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        return (await ctx.db.boards(args.groupId)) ?? [];
      },
    });
  },
});
