import { objectType } from 'nexus';
import { Board } from './Board';
import { GridRow } from './GridRow';

export const BoardState = objectType({
  name: 'BoardState',
  definition(t) {
    t.id('id');
    t.int('revision', {
      description:
        'The revision is an integer that\'s incremented every time the Board is updated (an "update" consists of a single Person being moved on the Board)',
    });
    t.list.field('rows', {
      type: GridRow,
    });
    t.field('board', {
      type: Board,
    });
    t.field('createdAt', {
      type: 'DateTime',
    });
  },
  description: '',
});
