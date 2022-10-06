import { objectType } from 'nexus';
import { Board } from './Board';
import { GridRow } from './GridRow';

export const BoardState = objectType({
  name: 'BoardState',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.int('revision', {
      description:
        'The revision is an integer that\'s incremented every time the Board is updated (an "update" consists of a single Person being moved on the Board)',
    });
    t.nonNull.list.field('rows', {
      type: GridRow,
    });
    t.nonNull.field('board', {
      type: Board,
      resolve: (root, _args, ctx) => {
        const board = ctx.db.board(root.boardId);
        if (!board) {
          throw new Error(
            `Could not retrieve Board ${root.boardId} from the db`
          );
        }

        return board;
      },
    });
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    });
  },
  description: '',
});
