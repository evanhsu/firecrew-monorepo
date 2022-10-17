import { ApolloClient } from '@apollo/client';
import { apolloCache } from './cache';
import { splitLink } from './link';

export const apolloClient = new ApolloClient({
    connectToDevTools: true,
    link: splitLink,
    cache: apolloCache,
});
