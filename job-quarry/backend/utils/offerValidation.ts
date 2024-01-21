import { GraphQLError } from "graphql";
import { CreateOfferInput, UpdateOfferInput } from "../types";


function offerValidation(input: CreateOfferInput | UpdateOfferInput) {
    const { input: { title, mode, location, level, expiresAt, contractType, salary, requiredTechnologies, optionalTechnologies, description, tasks, required, optional, benefits, recruitmentStages } } = input;
    if (!title) throw new GraphQLError('Tytuł jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (title.length > 40) throw new GraphQLError('Tytuł może mieć maksymalnie 40 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!mode) throw new GraphQLError('Tryb pracy jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!location) throw new GraphQLError('Lokalizacja jest wymagana', { extensions: { code: 'VALIDATION_ERROR' } });
    if (location.length > 40) throw new GraphQLError('Lokalizacja może mieć maksymalnie 40 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!level) throw new GraphQLError('Poziom jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!expiresAt) throw new GraphQLError('Data wygaśnięcia jest wymagana', { extensions: { code: 'VALIDATION_ERROR' } });
    if (new Date(expiresAt) <= new Date()) throw new GraphQLError('Data wygaśnięcia nie może być w przeszłości', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!contractType) throw new GraphQLError('Typ umowy jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!salary) throw new GraphQLError('Płaca jest wymagana', { extensions: { code: 'VALIDATION_ERROR' } });
    if (salary < 0) throw new GraphQLError('Płaca musi być dodatnia', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!requiredTechnologies || requiredTechnologies.length === 0) throw new GraphQLError('Wymagane technologie są wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!optionalTechnologies) throw new GraphQLError('Mile widziane technologie są wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!description) throw new GraphQLError('Opis jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (description.length > 600) throw new GraphQLError('Opis może mieć maksymalnie 600 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!tasks) throw new GraphQLError('Zadania są wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!required) throw new GraphQLError('Wymagania są wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!optional) throw new GraphQLError('Opcjonalne są wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!benefits) throw new GraphQLError('Benefity są wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!recruitmentStages) throw new GraphQLError('Kroki rekrutacji są wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
}

export default offerValidation;