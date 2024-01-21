import { GraphQLError } from "graphql";
import contextAuthentication from "../middleware/contextAuthentication"
import { MyContext, CompanySettingsInput, UserSettingsInput, Experience } from "../types"
import { Company, User } from "../models";
import getAWSResource from "../utils/getAWSResource";
import companySettingsValidation from "../utils/companySettingsValidation";
import { CompanyI } from "../models/Company";
import bcrypt from 'bcrypt';
import userSettingsValidation from "../utils/userSettingsValidation";
import { ExperienceSchema, UserI } from "../models/User";

export default {
    Query: {
        async getMeCompany(__: unknown, _: unknown, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Musisz być firmą', { extensions: { code: 'FORBIDDEN' } });
            const companyDB = await Company.findById(company._id);
            if (!companyDB) throw new GraphQLError('Firma nie istnieje', { extensions: { code: 'FORBIDDEN' } });
            if (companyDB.logo) {
                companyDB.logo = await getAWSResource(`logos/${companyDB.logo}`);
            }
            return companyDB;
        },
        async getMeUser(__: unknown, _: unknown, context: MyContext) {
            const user = await contextAuthentication(context);
            if (user.isCompany) throw new GraphQLError('Musisz być użytkownikiem', { extensions: { code: 'FORBIDDEN' } });
            const userDB = await User.findById(user._id);
            if (!userDB) throw new GraphQLError('Użytkownik nie istnieje', { extensions: { code: 'FORBIDDEN' } });
            if (userDB.profilePicture) {
                userDB.profilePicture = await getAWSResource(`pfp/${userDB.profilePicture}`);
            }
            return userDB;
        }
    },
    Mutation: {
        async updateCompanySettings(__: unknown, args: CompanySettingsInput, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Musisz być firmą', { extensions: { code: 'FORBIDDEN' } });
            const me = await Company.findById(company._id) as CompanyI;
            await companySettingsValidation(args, me);
            const { settingsInput: { companyName, email, password, website, logo, socialMedia: { facebook, instagram, linkedin, github }, description } } = args;
            me.companyName = companyName;
            me.email = email;
            if (password) me.password = await bcrypt.hash(password, 10);
            me.website = website;
            if (logo) me.logo = logo;
            me.socialMedia.facebook = facebook;
            me.socialMedia.instagram = instagram;
            me.socialMedia.linkedin = linkedin;
            me.socialMedia.github = github;
            me.description = description;
            try {
                await me.save();
                return {
                    success: true
                }
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
        },
        async updateUserSettings(__: unknown, args: UserSettingsInput, context: MyContext) {
            const user = await contextAuthentication(context);
            if (user.isCompany) throw new GraphQLError('Nie możesz być firmą', { extensions: { code: 'FORBIDDEN' } });
            const me = await User.findById(user._id) as UserI;
            await userSettingsValidation(args, me);
            const { settingsInput: { name, surname, email, age, profilePicture, password, description, portfolio, socialMedia: { facebook, instagram, linkedin, github }, skills, experience } } = args;
            me.name = name;
            me.surname = surname;
            me.email = email;
            me.age = age;
            if (profilePicture) me.profilePicture = profilePicture;
            if (password) me.password = await bcrypt.hash(password, 10);
            me.description = description;
            me.portfolio = portfolio;
            me.socialMedia.facebook = facebook;
            me.socialMedia.instagram = instagram;
            me.socialMedia.linkedin = linkedin;
            me.socialMedia.github = github;
            me.skills = skills;
            const experienceWithDates = experience.map(item => {
                const experience = item as Experience;
                experience.startDate = new Date(experience.startDate);
                if (experience.endDate) experience.endDate = new Date(experience.endDate);
                return experience;
            }) as ExperienceSchema[];
            me.experience = experienceWithDates;
            try {
                await me.save();
                return {
                    success: true
                }
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
        }
    }
}