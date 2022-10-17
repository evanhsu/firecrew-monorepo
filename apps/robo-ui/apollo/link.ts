import { HttpLink, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { isSSR } from '../utils/utils';

const httpLink = new HttpLink({
    uri: `http://192.168.50.42:4000/graphql`,
});

const wsLink = isSSR()
    ? null
    : new GraphQLWsLink(
          createClient({
              url: 'ws://192.168.50.42:4000/graphql',
              // connectionParams: {
              //     authToken: myAuthToken
              // }
          })
      );

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
export const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink ?? httpLink, // Kind of hacky to appease Typescript. The wsLink should always be available, but could technically be null if NextJS runs this on the server side (SSR), which it won't.
    httpLink
);
