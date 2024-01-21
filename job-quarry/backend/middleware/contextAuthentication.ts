import { GraphQLError } from "graphql";
import { MyContext, MyJwtPayload } from "../types";
import verifyToken from "../utils/verifyToken";
import { Company, User } from "../models";


async function contextAuthentication(context: MyContext): Promise<MyJwtPayload> {
    const { authHeader } = context;
    if (!authHeader) throw new GraphQLError('Nie znaleziono tokena', { extensions: { code: 'UNAUTHORIZED' } });
    const token = authHeader.split(' ')[1];
    if (!token) throw new GraphQLError('Nie znaleziono tokena', { extensions: { code: 'UNAUTHORIZED' } });
    let payload;
    try {
        payload = await verifyToken(token, process.env.JWT_SECRET as string) as MyJwtPayload;
    } catch (err: any) {
        throw new GraphQLError(err.message, { extensions: { code: 'UNAUTHORIZED' } });
    }
    const userFound = await User.findById(payload._id);
    const companyFound = await Company.findById(payload._id);
    if (!userFound && !companyFound) throw new GraphQLError('Użytkownik nie istnieje', { extensions: { code: 'UNAUTHORIZED' } });
    return payload;
}

export default contextAuthentication;