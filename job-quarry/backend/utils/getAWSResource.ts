import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GraphQLError } from "graphql";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string
    },
    region: process.env.AWS_BUCKET_REGION as string
});

async function getAWSResource(path: string) {
    const command = new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: path });
    try {
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return url;
    } catch (err: any) {
        throw new GraphQLError(err.message, { extensions: { code: 'SERVER_ERROR' } });
    }
}

export default getAWSResource;