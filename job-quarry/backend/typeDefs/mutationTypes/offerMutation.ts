export default `
    bookmark(id: String!): BookmarkResponse!
    createOffer(input: CreateOfferInput!): Offer!
    updateOffer(input: UpdateOfferInput!): Offer!
    deleteOffer(id: String!): Result!
`;