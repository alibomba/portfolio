import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import accessToken from './accessToken';

const wsLink = new GraphQLWsLink(createClient({
    url: import.meta.env.VITE_WS_URL,
    connectionParams: async () => {
        const token = await accessToken();
        return {
            authorization: `Bearer ${token}`
        }
    }
}));

export default wsLink;