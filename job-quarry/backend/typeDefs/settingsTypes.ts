export default `#graphql
    input SocialMediaInput{
        facebook: String
        instagram: String
        linkedin: String
        github: String
    }

    input ExperienceInput{
        title: String!
        company: String!
        startDate: String!
        endDate: String
        description: String!
    }

    input CompanySettingsInput{
        companyName: String!
        email: String!
        password: String
        website: String!
        logo: String
        socialMedia: SocialMediaInput
        description: String
    }

    input UserSettingsInput{
        name: String!
        surname: String!
        email: String!
        age: Int!
        profilePicture: String
        password: String
        description: String!
        portfolio: String!
        socialMedia: SocialMediaInput
        skills: [String!]!
        experience: [ExperienceInput!]!
    }
`;