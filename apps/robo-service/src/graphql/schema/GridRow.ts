import { objectType } from 'nexus';
import { Person } from './Person';

export const GridRow = objectType({
  name: 'GridRow',
  definition(t) {
    t.id('id');
    t.int('order', {
      description:
        'The 0-index row number, where Row 0 is at the top of the Board',
    });
    t.nonNull.field('person', {
      type: Person,
    });
    t.nonNull.int('activeColumn', {
      description:
        'Columns are 0-indexed from left-to-right (column 0 is the left-most).' +
        'The activeColumn is the column in which the Person on this row resides.',
    });
  },
});
