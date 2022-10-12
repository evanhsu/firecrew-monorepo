import {
  extendType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
  subscriptionField,
  unionType,
} from 'nexus';
import { NotFoundError } from '../../errors/errors';
import { pubsub } from '../../pubsub/pubsub';
import { BoardState } from './BoardState';
import { Group } from './Group';
import { withFilter } from 'graphql-subscriptions';

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

export const SingleBoardSubscription = subscriptionField('watchBoard', {
  type: nonNull(Board),
  args: {
    boardId: nonNull(stringArg()),
  },
  // Filtering out events that correspond with other Boards (not the one being "watched" via args.groupId)
  // By preventing the subscribe function from returning a value, we prevent a subscription update from being
  // broadcast.
  subscribe: withFilter(
    () => pubsub.asyncIterator([`BOARD_UPDATED`]),
    (payload, variables) => {
      return payload.board.boardId === variables.boardId;
    }
  ),
  // The return value from the subscribe() function becomes the 'root' input to the resolve() function.
  // resolve() is called every time subscribe() returns a value.
  // @ts-ignore
  resolve: async (root, args, ctx) => {
    return await ctx.db.board(args.boardId);
  },
});
