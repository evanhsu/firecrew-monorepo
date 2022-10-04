import { server } from './app/server';

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
