import {
    arg,
    extendType,
    inputObjectType,
    list,
    nonNull,
    objectType,
} from 'nexus';
import { PersonModel } from '../../database/db';

export const Person = objectType({
    name: 'Person',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.string('name');
        t.nonNull.list.string('qualifications', {
            resolve: (root) => {
                return root.qualifications ?? [];
            },
        });
        t.string('avatar');
    },
});

export const PersonQuery = extendType({
    type: 'Query',
    definition(t) {
        t.field('people', {
            type: nonNull(list(Person)),
            args: {
                include: arg({
                    type: PersonQueryIncludeFilterInput,
                }),
                omit: arg({
                    type: PersonQueryOmitFilterInput,
                }),
            },

            resolve: async (_root, args, ctx) => {
                let matches: PersonModel[] = [];

                ctx.services.personService.ridicule();

                if (args.include?.fuzzyName) {
                    matches =
                        await ctx.services.personService.fuzzySearchByName(
                            args.include.fuzzyName,
                            6
                        );
                }

                // TODO: combine the 'include' and 'omit' filters into a more efficient SQL statement
                const boardState = await ctx.db.boardState(args.omit!.boardId!);
                const personIdsOnBoard = boardState?.rows.map(
                    (row) => row.personId
                );

                const filteredMatches = matches.filter((person) => {
                    if (args.omit?.ids?.includes(person.id)) {
                        return false;
                    }

                    if (args.omit?.boardId) {
                        if (personIdsOnBoard?.includes(person.id)) {
                            return false;
                        }
                    }

                    return true;
                });

                return filteredMatches;
            },
        });
    },
});

export const PersonQueryIncludeFilterInput = inputObjectType({
    name: 'PersonQueryIncludeFilterInput',
    definition(t) {
        t.id('id');
        t.string('qualification', {
            description:
                'Only people with this qualification will be returned. Example: `{ qualification: "ICT4" }`',
        });
        t.string('fuzzyName', {
            description:
                "This string will be fuzzy-matched with Peoples' names",
        });
    },
});

export const PersonQueryOmitFilterInput = inputObjectType({
    name: 'PersonQueryOmitFilterInput',
    definition(t) {
        t.list.id('ids', {
            description: 'Omit People with these specific IDs from the results',
        });
        t.id('boardId', {
            description:
                'Omit people who appear on this specific Rotation Board',
        });
    },
});
