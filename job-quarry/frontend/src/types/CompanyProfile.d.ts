type CompanyProfile = {
    _id: string,
    logo?: string,
    companyName: string,
    socialMedia: {
        facebook?: string,
        instagram?: string,
        linkedin?: string,
        github?: string
    },
    description?: string,
    website?: string,
    offers: Omit<OfferTile, 'company'>[]
}