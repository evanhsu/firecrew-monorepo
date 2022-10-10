import { HttpLink } from '@apollo/client';

export const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});
