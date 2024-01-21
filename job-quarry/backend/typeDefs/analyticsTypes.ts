export default `#graphql
    type CTR{
        percentage: Float
        thumbnailViewsMinusViews: Int!
        views: Int!
    }

    type ApplicantsCategories{
        notSpecified: Int!
        first: Int!
        second: Int!
        third: Int!
        fourth: Int!
        fifth: Int!
        sixth: Int!
    }

    type Analytics{
        totalViews: Int!
        CTR: CTR!
        applications: Int!
        applicationsToViews: Float
        applicantsCategories: ApplicantsCategories!
    }

    input AnalyticsInput{
        id: String!
        startDate: String
        endDate: String
    }
`;