type Offer = {
    _id: string,
    title: string,
    company: {
        _id: string,
        companyName: string,
        logo?: string
    },
    mode: string,
    location: string,
    level: string,
    expiresAt: string
    contractType: string,
    salary: number,
    requiredTechnologies: string[],
    optionalTechnologies: string[],
    description: string,
    tasks: string[],
    required: string[],
    optional: string[],
    benefits: string[],
    recruitmentStages: string[]
}