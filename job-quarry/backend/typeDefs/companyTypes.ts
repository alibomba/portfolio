export default `#graphql
    type Company{
        _id: String!
        companyName: String!
        email: String!
        website: String
        logo: String
        socialMedia: SocialMedia
        description: String
        offers: [Offer!]!
        joinedAt: DateTime!
    }
`