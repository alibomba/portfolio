export default `
    isBookmarked(id: String!): Result!
    getOffer(id: String!): Offer!
    myOffers: [Offer!]!
    getMyBookmarks(page: Int!): OfferPaginationResponse!
`;