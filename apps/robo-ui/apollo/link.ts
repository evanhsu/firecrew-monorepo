import { HttpLink } from '@apollo/client';

export const link = new HttpLink({
  uri: `http://192.168.50.42:4000/graphql`,
});
