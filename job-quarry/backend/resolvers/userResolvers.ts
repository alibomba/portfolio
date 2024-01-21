import { GraphQLError } from "graphql";
import { User } from "../models";
import getAWSResource from "../utils/getAWSResource";


export default {
    Query: {
        async getUser(__: unknown, { id }: { id: string }) {
            let user;
            try {
                user = await User.findById(id);
            } catch (err: any) {
                if (err.name === 'CastError' && err.kind === 'ObjectId') {
                    throw new GraphQLError('Nie znaleziono użytkownika', { extensions: { code: 'NOT_FOUND' } });
                }
                else {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
            if (!user) throw new GraphQLError('Nie znaleziono użytkownika', { extensions: { code: 'NOT_FOUND' } });
            if (user.profilePicture) {
                user.profilePicture = await getAWSResource(`pfp/${user.profilePicture}`);
            }
            return user;
        }
    }
}