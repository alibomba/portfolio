export default `#graphql
    scalar DateTime

    type Application{
        _id: String!
        name: String!
        surname: String!
        email: String!
        phoneNumber: String!
        CV: String!
        details: String
        user: User
        offer: Offer!
        status: String!
        sentAt: DateTime!
    }

    type ApplicationPaginationResponse{
        currentPage: Int!
        lastPage: Int!
        data: [Application!]!
    }

    input ApplicationInput{
        offerId: String!
        name: String!
        surname: String!
        email: String!
        phoneNumber: String!
        cvUrl: String!
        details: String
    }

    input ApplicationChangeStatusInput{
        id: String!
        status: String!
    }
`;