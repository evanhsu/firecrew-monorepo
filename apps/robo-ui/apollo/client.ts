import { ApolloClient } from '@apollo/client';
import { apolloCache } from './cache';
import { link } from './link';

export const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link,
  cache: apolloCache,
});
