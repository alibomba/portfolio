import { Company, User } from "../models";
import { UserRegisterInput } from "../types";
import { GraphQLError } from "graphql";


async function userRegisterValidation(userRegisterInput: UserRegisterInput) {
    const { userRegisterInput: { name, surname, email, age, password } } = userRegisterInput;
    if (!name) throw new GraphQLError('Imię jest wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (name.length > 20) throw new GraphQLError('Imię może mieć maksymalnie 20 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!surname) throw new GraphQLError('Nazwisko jest wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (surname.length > 20) throw new GraphQLError('Nazwisko może mieć maksymalnie 20 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!age) throw new GraphQLError('Wiek jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (isNaN(age)) throw new GraphQLError('Wiek musi być liczbą', { extensions: { code: 'VALIDATION_ERROR' } });
    if (age < 18) throw new GraphQLError('Minimalny wiek to 18', { extensions: { code: 'VALIDATION_ERROR' } });
    if (age > 99) throw new GraphQLError('Maksymalny wiek to 99', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!email) throw new GraphQLError('Adres e-mail jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (email.length > 40) throw new GraphQLError('Adres e-mail może mieć maksymalnie 40 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (!email.match(emailRegex)) throw new GraphQLError('Podaj poprawny adres e-mail', { extensions: { code: 'VALIDATION_ERROR' } });
    const userFound = await User.findOne({ email });
    const companyFound = await Company.findOne({ email });
    if (userFound || companyFound) throw new GraphQLError('Adres e-mail jest już zajęty', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!password) throw new GraphQLError('Hasło jest wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (password.length < 8 || password.length > 60) throw new GraphQLError('Hasło musi mieć pomiędzy 8 a 60 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
}

export default userRegisterValidation;