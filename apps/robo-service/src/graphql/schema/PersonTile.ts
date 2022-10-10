import { objectType } from 'nexus';
import { Person } from './Person';

export const PersonTile = objectType({
  name: 'PersonTile',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.int('row', {
      description:
        'The 0-index row number, where Row 0 is at the top of the Board',
    });
    t.nonNull.int('column', {
      description:
        'Columns are 0-indexed from left-to-right (column 0 is the left-most).' +
        'The activeColumn is the column in which the Person on this row resides.',
    });
    t.nonNull.field('person', {
      type: Person,
      resolve: async (root, _args, ctx) => {
        const person = await ctx.db.people(root.personId);
        if (!person) {
          throw new Error(
            `Couldn't find Person ${root.personId} for Row ${root.row}`
          );
        }
        return person;
      },
    });
  },
});
