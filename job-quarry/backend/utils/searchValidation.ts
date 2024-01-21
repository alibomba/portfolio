import { GraphQLError } from "graphql";
import { OfferSearchInput } from "../types";

function searchValidation(searchInput: OfferSearchInput) {
    const { searchInput: { phrase, city, salaryFrom, salaryTo } } = searchInput
    if (phrase && phrase.length > 50) {
        throw new GraphQLError('Fraza może mieć maksymalnie 50 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    }
    if (city && city.length > 40) {
        throw new GraphQLError('Miasto może mieć maksymalnie 40 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    }
    if (salaryFrom && salaryTo && (salaryFrom > salaryTo)) {
        throw new GraphQLError('Płaca minimalna musi być mniejsza od maksymalnej', { extensions: { code: 'VALIDATION_ERROR' } });
    }
}

export default searchValidation;