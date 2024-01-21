type OfferTile = {
    _id: string,
    title: string,
    company: {
        companyName: string,
        logo?: string
    },
    mode: string,
    location: string,
    requiredTechnologies: string[],
    salary: number
}