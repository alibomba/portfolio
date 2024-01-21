import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import { createServer } from 'http';
import express, { Application } from 'express';
import { PubSub } from 'graphql-subscriptions';
import mongoose from 'mongoose';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import fileUploadRoutes from './routes/fileUploadRoutes';

const app: Application = express();

const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
    server: httpServer
});

const pubsub = new PubSub();

const serverCleanup = useServer({
    schema,
    context: (ctx, msg, args) => {
        return { pubsub, authHeader: ctx.connectionParams?.authorization }
    }
}, wsServer);

const server = new ApolloServer({
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    }
                }
            }
        }
    ],
    nodeEnv: process.env.NODE_ENV
});

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
    } catch (err) {
        return console.log(`${err} mongo failed to connect`);
    }

    await server.start();

    app.use(cors({ origin: process.env.FRONTEND_URL }));
    app.use(express.json());
    app.use('/storage', express.static(`${__dirname}/public`));
    app.use('/api', fileUploadRoutes);

    app.use('/',
        expressMiddleware(server, {
            context: async ({ req }) => ({ authHeader: req.headers?.authorization, pubsub })
        })
    );


    const PORT = process.env.PORT || 8000;

    httpServer.listen(PORT);
    console.log(`Server started on port ${PORT}`);
}

main();