import { objectType } from 'nexus';
import { Board } from './Board';
import { PersonTile } from './PersonTile';

export const BoardState = objectType({
  name: 'BoardState',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.int('revision', {
      description:
        'The revision is an integer that\'s incremented every time the Board is updated (an "update" consists of a single Person being moved on the Board)',
    });
    t.nonNull.list.field('rows', {
      type: PersonTile,
    });
    t.nonNull.field('board', {
      type: Board,
      resolve: async (root, _args, ctx) => {
        const board = await ctx.db.board(root.boardId);
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
