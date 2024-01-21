export default `
    userRegister(userRegisterInput: UserRegisterInput!): Result
    companyRegister(companyRegisterInput: CompanyRegisterInput!): Result
    login(loginInput: LoginInput!): LoginResult
    refreshToken(refreshToken: String!): RefreshTokenResult
    logout(refreshToken: String!): Result
`;