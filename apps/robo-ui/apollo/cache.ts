import { InMemoryCache } from '@apollo/client';

// Initialize the local Apollo cache with the basic shape of the expected data
export const apolloCache = new InMemoryCache({
  addTypename: true,
});
