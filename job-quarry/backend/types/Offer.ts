import { Types } from "mongoose"

type Offer = {
    title: string,
    mode: string,
    location: string,
    level: string,
    expiresAt: Date,
    contractType: string,
    salary: number,
    requiredTechnologies: string[],
    optionalTechnologies: string[],
    description: string,
    tasks: string[],
    required: string[],
    optional: string[],
    benefits: string[],
    recruitmentStages: string[],
    company: Types.ObjectId,
    createdAt: Date
}

export default Offer