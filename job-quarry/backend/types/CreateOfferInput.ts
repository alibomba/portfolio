import { ContractType, Level, WorkMode } from "."

type CreateOfferInput = {
    input: {
        title: string,
        mode: keyof typeof WorkMode,
        location: string,
        level: keyof typeof Level
        expiresAt: string,
        contractType: keyof typeof ContractType
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
}

export default CreateOfferInput;