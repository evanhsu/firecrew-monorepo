import { ApolloServer } from 'apollo-server-express';
// import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { context } from './graphql/context';
import { schema } from './graphql/schema';

import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const app = express();
const httpServer = createServer(app);

// Create the WebSocket server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
});

/**
 * Configure the WebSocket server and start listening.
 * Save the returned server's info so we can shutdown this server later
 *
 * Note that we need to provide the Schema and Context definition to the
 * WebSocket server _separately_ from the HTTP Server.
 */
const serverCleanup = useServer(
    {
        schema,
        context: (ctx, msg, args) => {
            return context;
        },
    },
    wsServer
);

/**
 * Configure Apollo Server
 * https://www.apollographql.com/docs/apollo-server/v3/data/subscriptions
 */
export const server = new ApolloServer({
    /**
     * Note that the schema and context definitions here ONLY apply to
     * inbound requests to the HTTP server - the websocket server is configured
     * separately (above). Any changes to schema/context probably need to be made
     * in both places.
     */
    schema,
    context: async () => {
        return context;
    },
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
        ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        // ApolloServerPluginLandingPageGraphQLPlayground,
    ],
});

export const startServer = async (port: number = 4000) => {
    await server.start();
    server.applyMiddleware({ app });

    httpServer.listen(port, () => {
        console.log(
            `Server is now running on http://localhost:${port}${server.graphqlPath}`
        );
    });

    return httpServer;
};
