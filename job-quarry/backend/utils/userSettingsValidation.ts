import { GraphQLError } from "graphql";
import { UserSettingsInput } from "../types";
import { UserI } from "../models/User";
import { Company, User } from "../models";
import { S3Client } from "@aws-sdk/client-s3";
import { HeadObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION as string
});


async function userSettingsValidation(input: UserSettingsInput, me: UserI) {
    const { settingsInput: { name, surname, email, age, profilePicture, password, description, portfolio, socialMedia: { facebook, instagram, linkedin, github }, skills, experience } } = input;

    if (!name) throw new GraphQLError('Imię jest wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (name.length > 20) throw new GraphQLError('Imię może mieć maksymalnie 20 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!surname) throw new GraphQLError('Nazwisko jest wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (surname.length > 20) throw new GraphQLError('Nazwisko może mieć maksymalnie 20 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (me.email !== email) {
        if (!email) throw new GraphQLError('Adres e-mail jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
        if (email.length > 40) throw new GraphQLError('Adres e-mail może mieć maksymalnie 40 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
        const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        if (!email.match(emailRegex)) throw new GraphQLError('Podaj poprawny adres e-mail', { extensions: { code: 'VALIDATION_ERROR' } });
        const companyFound = await Company.findOne({ email });
        const userFound = await User.findOne({ email });
        if (companyFound || userFound) throw new GraphQLError('Adres e-mail jest już zajęty', { extensions: { code: 'VALIDATION_ERROR' } });
    }
    if (!age) throw new GraphQLError('Wiek jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (age < 18) throw new GraphQLError('Minimalny wiek to 18', { extensions: { code: 'VALIDATION_ERROR' } });
    if (age > 99) throw new GraphQLError('Maksymalny wiek to 99', { extensions: { code: 'VALIDATION_ERROR' } });
    if (profilePicture) {
        try {
            const command = new HeadObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `pfp/${profilePicture}`
            });
            await s3.send(command);
        } catch (err) {
            throw new GraphQLError('Błąd przesyłania pliku', { extensions: { code: 'VALIDATION_ERROR' } });
        }
    }
    if (password) {
        if (password.length < 8 || password.length > 60) throw new GraphQLError('Hasło musi mieć pomiędzy 8 a 60 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    }
    if (!description) throw new GraphQLError('Opis jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (description.length > 600) throw new GraphQLError('Opis może mieć maksymalnie 600 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (portfolio && portfolio.length > 500) throw new GraphQLError('Portfolio może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (facebook && facebook.length > 500) throw new GraphQLError('Facebook może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (instagram && instagram.length > 500) throw new GraphQLError('Instagram może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (linkedin && linkedin.length > 500) throw new GraphQLError('Linkedin może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (github && github.length > 500) throw new GraphQLError('Github może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (skills.some(item => item === '')) throw new GraphQLError('Umiejętność nie może być pusta', { extensions: { code: 'VALIDATION_ERROR' } });
    if (experience.some(item => !item.title)) throw new GraphQLError('Tytuł jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (experience.some(item => !item.company)) throw new GraphQLError('Firma jest wymagana', { extensions: { code: 'VALIDATION_ERROR' } });
    if (experience.some(item => !item.startDate)) throw new GraphQLError('Data rozpoczęcia jest wymagana', { extensions: { code: 'VALIDATION_ERROR' } });
    if (experience.some(item => new Date() < new Date(item.startDate))) throw new GraphQLError('Data rozpoczęcia nie może być w przyszłości', { extensions: { code: 'VALIDATION_ERROR' } });
    if (experience.some(item => {
        if (!item.endDate) return false;
        if (new Date() < new Date(item.endDate)) return true;
    })) throw new GraphQLError('Data zakończenia nie może być w przyszłości', { extensions: { code: 'VALIDATION_ERROR' } });
    if (experience.some(item => !item.description)) throw new GraphQLError('Opis jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
}

export default userSettingsValidation;