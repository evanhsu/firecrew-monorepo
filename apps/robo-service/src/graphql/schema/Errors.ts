import { interfaceType, objectType } from 'nexus';

export const Error = interfaceType({
    name: 'Error',
    resolveType(error) {
        return error.__typename ?? 'Error';
    },
    definition(t) {
        t.string('message');
    },
});

export const NotFoundError = objectType({
    name: 'NotFoundError',
    definition(t) {
        t.implements(Error);
        t.string('notFoundTypename');
        t.string('notFoundId');
    },
});
