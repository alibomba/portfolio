import { GraphQLError } from "graphql";
import { ApplicationInput } from "../types";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION as string
});

async function applicationValidation(applicationInput: ApplicationInput) {
    const { applicationInput: { name, surname, email, phoneNumber, cvUrl, offerId, details } } = applicationInput;
    if (!name) throw new GraphQLError('Imię jest wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (name.length > 20) throw new GraphQLError('Imię może mieć maksymalnie 20 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!surname) throw new GraphQLError('Nazwisko jest wymagane', { extensions: { code: 'VALIDATION_ERROR' } });
    if (surname.length > 20) throw new GraphQLError('Nazwisko może mieć maksymalnie 20 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!email) throw new GraphQLError('Adres e-mail jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (email.length > 40) throw new GraphQLError('Adres e-mail może mieć maksymalnie 40 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    if (!email.match(emailRegex)) throw new GraphQLError('Podaj poprawny adres e-mail', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!phoneNumber) throw new GraphQLError('Numer telefonu jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
    if (phoneNumber.length > 25) throw new GraphQLError('Numer telefonu może mieć maksymalnie 25 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (details && details.length > 300) throw new GraphQLError('Szczegóły mogą mieć maksymalnie 300 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
    if (!offerId) throw new GraphQLError('Identyfikator oferty jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });

    try {
        const command = new HeadObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `cvs/${cvUrl}`
        });
        await s3.send(command);
    } catch (err: any) {
        throw new GraphQLError('Błąd przesyłania pliku', { extensions: { code: 'VALIDATION_ERROR' } });
    }
}

export default applicationValidation;