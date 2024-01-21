import { GraphQLError } from "graphql";
import { CompanySettingsInput } from "../types";
import { Company, User } from "../models";
import { CompanyI } from "../models/Company";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION as string
});


async function companySettingsValidation(input: CompanySettingsInput, me: CompanyI) {
    const { settingsInput: { companyName, email, password, website, logo, socialMedia: { facebook, instagram, linkedin, github }, description } } = input;
    if (me.email !== email) {
        if (!email) throw new GraphQLError('Adres e-mail jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
        if (email.length > 40) throw new GraphQLError('Adres e-mail może mieć maksymalnie 40 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
        const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
        if (!email.match(emailRegex)) throw new GraphQLError('Podaj poprawny adres e-mail', { extensions: { code: 'VALIDATION_ERROR' } });
        const companyFound = await Company.findOne({ email });
        const userFound = await User.findOne({ email });
        if (companyFound || userFound) throw new GraphQLError('Adres e-mail jest już zajęty', { extensions: { code: 'VALIDATION_ERROR' } });
    }
    if (me.companyName !== companyName) {
        if (!companyName) throw new GraphQLError('Nazwa firmy jest wymagana', { extensions: { code: 'VALIDATION_ERROR' } });
        if (companyName.length > 30) throw new GraphQLError('Nazwa firmy może mieć maksymalnie 30 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
        const companyWithNameFound = await Company.findOne({ companyName });
        if (companyWithNameFound) throw new GraphQLError('Nazwa firmy jest już zajęta', { extensions: { code: 'VALIDATION_ERROR' } });
    }
    if (password) {
        if (password.length < 8 || password.length > 60) throw new GraphQLError('Hasło musi mieć pomiędzy 8 a 60 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    }
    if (website && website.length > 500) throw new GraphQLError('Strona internetowa może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (logo) {
        try {
            const command = new HeadObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `logos/${logo}`
            });
            await s3.send(command);
        } catch (err) {
            throw new GraphQLError('Błąd przesyłania pliku', { extensions: { code: 'VALIDATION_ERROR' } });
        }
    }
    if (facebook && facebook.length > 500) throw new GraphQLError('Facebook może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (instagram && instagram.length > 500) throw new GraphQLError('Instagram może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (linkedin && linkedin.length > 500) throw new GraphQLError('Linkedin może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (github && github.length > 500) throw new GraphQLError('Github może mieć maksymalnie 500 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (description && description.length > 600) throw new GraphQLError('Opis może mieć maksymalnie 600 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
}

export default companySettingsValidation;