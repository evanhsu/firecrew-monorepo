import { objectType } from 'nexus';
import { Board } from './Board';
import { Person } from './Person';

export const Group = objectType({
    name: 'Group',
    definition(t) {
        t.id('id');
        t.string('name');
        t.field('board', {
            type: Board,
            description:
                'The Board that this Group owns (each Group owns a single Board)',
        });
        t.list.field('members', {
            type: Person,
        });
    },
});
