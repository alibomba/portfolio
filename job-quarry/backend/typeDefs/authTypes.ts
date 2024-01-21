export default `#graphql
    scalar DateTime

    input UserRegisterInput{
        email: String!
        name: String!
        surname: String!
        age: Int!
        password: String!
    }

    input CompanyRegisterInput{
        email: String!
        companyName: String!
        password: String!
    }

    input LoginInput{
        email: String!
        password: String!
    }

    type LoginResult{
        accessToken: String!
        refreshToken: String!
        isCompany: Boolean!
    }

    type AuthResult{
        isCompany: Boolean!
    }

    type RefreshTokenResult{
        accessToken: String!
    }

    type Experience{
        title: String!
        company: String!
        startDate: DateTime!
        endDate: DateTime
        description: String!
    }

    type SocialMedia{
        facebook: String
        instagram: String
        linkedin: String
        github: String
    }

    type User{
        _id: String!
        name: String!
        surname: String!
        email: String!
        age: Int!
        profilePicture: String
        description: String
        portfolio: String
        socialMedia: SocialMedia
        skills: [String!]!
        experience: [Experience!]!
        joinedAt: DateTime!
    }
`;