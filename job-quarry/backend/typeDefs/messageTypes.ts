export default `#graphql
    type Message{
        _id: String!
        isMine: Boolean!
        content: String!
    }

    type MessageUser{
        _id: String!
        image: String
        isCompany: Boolean!
        name: String!
    }

    type ChatResponse{
        conversations: [MessageUser!]!
        messages: [Message!]!
    }

    input MessageInput{
        recipient: String!
        content: String!
    }

    type MessageRealtime{
        _id: String!
        isMine: Boolean!
        content: String!
        senderId: String!
    }
`;