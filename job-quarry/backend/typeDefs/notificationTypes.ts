export default `#graphql
    scalar DateTime

    type Notification{
        _id: String!
        image: String!
        message: String!
        redirect: String!
        seen: Boolean!
        createdAt: DateTime!
    }
`;