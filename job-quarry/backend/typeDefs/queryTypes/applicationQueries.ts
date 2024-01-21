export default `
    getMyApplicationsCompany(page: Int!): ApplicationPaginationResponse!
    getApplication(id: String!): Application!
    getMyApplicationsUser: [Application!]!
`;