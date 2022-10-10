import { arg, extendType, inputObjectType, objectType } from 'nexus';

export const Person = objectType({
  name: 'Person',
  definition(t) {
    t.nonNull.id('id');
    t.string('name');
    t.list.string('qualifications');
    t.string('avatar');
  },
});

export const PersonQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('people', {
      type: Person,
      args: {
        filter: arg({
          type: PersonQueryFilterInput,
        }),
      },
    });
  },
});

export const PersonQueryFilterInput = inputObjectType({
  name: 'PersonQueryFilterInput',
  definition(t) {
    t.id('id');
    t.string('qualification', {
      description:
        'Only people with this qualification will be returned. Example: `{ qualification: "ICT4" }`',
    });
  },
});
