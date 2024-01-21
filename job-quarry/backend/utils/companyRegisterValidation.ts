import { GraphQLError } from "graphql";
import { CompanyRegisterInput } from "../types";
import { Company, User } from "../models";


async function companyRegisterValidation(companyRegisterInput: CompanyRegisterInput) {
    const { companyRegisterInput: { email, companyName, password } } = companyRegisterInput;
    if (!email) throw new GraphQLError('Adres e-mail jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (email.length > 40) throw new GraphQLError('Adres e-mail może mieć maksymalnie 40 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (!email.match(emailRegex)) throw new GraphQLError('Podaj poprawny adres e-mail', { extensions: { code: 'VALIDATION_ERROR' } });
    const companyFound = await Company.findOne({ email });
    const userFound = await User.findOne({ email });
    if (companyFound || userFound) throw new GraphQLError('Adres e-mail jest już zajęty', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!companyName) throw new GraphQLError('Nazwa firmy jest wymagana', { extensions: { code: 'VALIDATION_ERROR' } });
    if (companyName.length > 30) throw new GraphQLError('Nazwa firmy może mieć maksymalnie 30 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    const companyWithNameFound = await Company.findOne({ companyName });
    if (companyWithNameFound) throw new GraphQLError('Nazwa firmy jest już zajęta', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!password) throw new GraphQLError('Hasło jest wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (password.length < 8 || password.length > 60) throw new GraphQLError('Hasło musi mieć pomiędzy 8 a 60 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
}

export default companyRegisterValidation;