import { GraphQLError } from "graphql";
import { Company, RefreshToken, User } from "../models";
import { MyContext, UserRegisterInput, CompanyRegisterInput, LoginInput, MyJwtPayload } from "../types"
import userRegisterValidation from "../utils/userRegisterValidation"
import bcrypt from 'bcrypt';
import companyRegisterValidation from "../utils/companyRegisterValidation";
import jwt from 'jsonwebtoken';
import verifyToken from "../utils/verifyToken";
import contextAuthentication from "../middleware/contextAuthentication";

export default {
    Query: {
        async getAuth(__: unknown, args: unknown, context: MyContext) {
            const { isCompany } = await contextAuthentication(context);
            return {
                isCompany
            }
        }
    },
    Mutation: {
        async userRegister(__: unknown, userRegisterInput: UserRegisterInput) {
            await userRegisterValidation(userRegisterInput);
            const { userRegisterInput: { name, surname, email, age, password } } = userRegisterInput;
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({ name, surname, email, age, password: passwordHash });
            try {
                await newUser.save();
                return {
                    success: true
                }
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
        },
        async companyRegister(__: unknown, companyRegisterInput: CompanyRegisterInput) {
            await companyRegisterValidation(companyRegisterInput);
            const { companyRegisterInput: { companyName, email, password } } = companyRegisterInput;
            const passwordHash = await bcrypt.hash(password, 10);
            const newCompany = new Company({ companyName, email, password: passwordHash });
            try {
                await newCompany.save();
                return {
                    success: true
                }
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
        },
        async login(__: unknown, { loginInput: { email, password } }: LoginInput) {
            if (!email || !password) throw new GraphQLError('Niepoprawny e-mail lub hasło', { extensions: { code: 'UNAUTHORIZED' } });
            const userFound = await User.findOne({ email });
            const companyFound = await Company.findOne({ email });
            if (!userFound && !companyFound) throw new GraphQLError('Niepoprawny e-mail lub hasło', { extensions: { code: 'UNAUTHORIZED' } });
            let isCompany;
            let entity;
            if (userFound) {
                isCompany = false;
                entity = userFound;
            }
            else {
                isCompany = true;
                entity = companyFound;
            }
            if (!await bcrypt.compare(password, entity!.password)) throw new GraphQLError('Niepoprawny e-mail lub hasło', { extensions: { code: 'UNAUTHORIZED' } });
            const payload: MyJwtPayload = { _id: entity!._id, email: entity!.email, isCompany };
            const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string);
            try {
                const savedToken = new RefreshToken({ token: refreshToken });
                await savedToken.save();
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
            return {
                accessToken,
                refreshToken,
                isCompany
            }
        },
        async refreshToken(__: unknown, { refreshToken }: { refreshToken: string }) {
            if (!refreshToken) throw new GraphQLError('Nie znaleziono tokena', { extensions: { code: 'UNAUTHORIZED' } });
            const tokenFound = await RefreshToken.findOne({ token: refreshToken });
            if (!tokenFound) throw new GraphQLError('Token nieprawidłowy', { extensions: { code: 'UNAUTHORIZED' } });
            let payload: MyJwtPayload | null = null;
            try {
                payload = await verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) as MyJwtPayload;
            } catch (err: any) {
                throw new GraphQLError(err.message, { extensions: { code: 'UNAUTHORIZED' } });
            }
            const newPayload: MyJwtPayload = { _id: payload._id, email: payload.email, isCompany: payload.isCompany };
            const newToken = jwt.sign(newPayload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_TTL });
            return {
                accessToken: newToken
            }
        },
        async logout(__: unknown, { refreshToken }: { refreshToken: string }, context: MyContext) {
            await contextAuthentication(context);
            if (!refreshToken) throw new GraphQLError('Nie znaleziono tokena', { extensions: { code: 'UNAUTHORIZED' } });
            const tokenFound = await RefreshToken.findOne({ token: refreshToken });
            if (!tokenFound) throw new GraphQLError('Token nieprawidłowy', { extensions: { code: 'UNAUTHORIZED' } });
            try {
                await RefreshToken.deleteOne({ token: refreshToken });
                return {
                    success: true
                }
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
        }
    }
}