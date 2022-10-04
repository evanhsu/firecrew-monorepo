import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { BoardState } from './BoardState';
import { Group } from './Group';

export const Board = objectType({
  name: 'Board',
  definition(t) {
    t.id('id');
    t.string('name');
    t.field('group', {
      type: Group,
    });
    t.field('state', {
      type: BoardState,
    });
  },
});

export const GetBoardByIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getBoardById', {
      type: Board,
      args: {
        boardId: nonNull(stringArg()),
      },
    });
  },
});

export const GetBoardByGroupQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getBoardByGroup', {
      type: Board,
      args: {
        groupId: nonNull(stringArg()),
      },
    });
  },
});
