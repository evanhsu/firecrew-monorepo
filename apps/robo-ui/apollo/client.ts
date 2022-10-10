import { ApolloClient, gql } from '@apollo/client';
import { GetBoardByGroupDocument } from '@firecrew/robo-service-client';
import { apolloCache } from './cache';
import { link } from './link';

export const apolloClient = new ApolloClient({
  link,
  cache: apolloCache,
});

const apolloClientZzz = new ApolloClient({
  link,
  cache: apolloCache,
  //   typeDefs,
  //   resolvers: {
  //     Mutation: {
  //       moveTile: (_root, args, { cache, getCacheKey }) => {
  //         // const boardId = getCacheKey({ __typename: 'BoardState', id: 1 }) // Eventually, each Board will have an id to support multiple boards
  //         const groupId = 'group-1-uuid'; // Eventually switch to the cacheKey instead, which looks like "Board:1"
  //         // const boardState = cache.readQuery({ query: GET_BOARD_STATE, id });
  //         const data = cache.readQuery({
  //           query: GetBoardByGroupDocument,
  //           variables: { groupId: groupId },
  //         });

  //         const newRow = {
  //           person: data.boards[0].state.rows[args.startPosition.row].person,
  //           activeColumn: args.hoverPosition.column,
  //           __typename: 'GridRow',
  //         };

  //         console.log(
  //           `Cutting row: ${JSON.stringify(
  //             data.boards[0].state.rows[args.startPosition.row]
  //           )}`
  //         );
  //         console.log(`inserting row: ${JSON.stringify(newRow)}`);

  //         data.boards[0].state.rows.splice(args.startPosition.row, 1); // Remove the row that we started dragging from...
  //         data.boards[0].state.rows.splice(args.hoverPosition.row, 0, newRow); // ...insert the dragged row at the current hover position

  //         console.log(data.boards[0].state.rows);
  //         // cache.writeData({ data: data });
  //         cache.writeQuery({
  //           query: gql`
  //             query SetBoardState($id: ID!) {
  //               state(id: $id) {
  //                 id
  //                 rows
  //               }
  //             }
  //           `,
  //           data: {
  //             state: {
  //               __typename: 'BoardState',
  //               id: 1,
  //               rows: data.boards[0].state.rows,
  //             },
  //           },
  //           variables: {
  //             id: 1,
  //           },
  //         });
  //         // return data?.boards[0];
  //       },
  //     },
  //   },
});
