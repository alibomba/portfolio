import { PubSub } from "graphql-subscriptions";

type MyContext = {
    authHeader?: string,
    pubsub: PubSub
}

export default MyContext;