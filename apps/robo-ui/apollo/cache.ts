import { InMemoryCache } from '@apollo/client';

// Initialize the local Apollo cache with the basic shape of the expected data
export const apolloCache = new InMemoryCache({
  addTypename: true,
});

// Initialize the cache with the basic shape of the data
// apolloCache.write({
//   data: {
//     boards: [{
//       __typename: 'Board',
//       state: 'BoardState',
//     }],
//   }
// });

export type CacheData = {
  boards: {
    __typename?: string;
    id: number;
    state: {
      id: number;
      createdAt: number;
      rows: {
        // id: string, // Let's use strings for IDs everywhere eventually
        person: {
          id: number;
          name: string;
          __typename?: string;
        };
        activeColumn: number;
        __typename?: string;
      }[];
    };
  }[];
};
