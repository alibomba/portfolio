import { GraphQLError } from "graphql";
import { ApplicationInput, MyContext, ApplicationChangeStatusInput } from "../types"
import applicationValidation from "../utils/applicationValidation";
import contextAuthentication from "../middleware/contextAuthentication";
import { Application, Company, Notification, Offer } from "../models";
import { OfferI } from "../models/Offer";
import { Types } from "mongoose";
import getAWSResource from "../utils/getAWSResource";
import { CompanyI } from "../models/Company";

export default {
    Query: {
        async getMyApplicationsCompany(__: unknown, { page }: { page: number }, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Użytkownik nie może otrzymywać aplikacji', { extensions: { code: 'FORBIDDEN' } });
            if (page < 1) throw new GraphQLError('Podaj poprawny numer strony', { extensions: { code: 'VALIDATION_ERROR' } });
            const offers = await Offer.find({ company: company._id });
            const applications = await Promise.all(offers.map(async offer => {
                const applications = await Application.find({ offer: offer._id }).populate('offer user');
                return applications;
            }));
            const applicationsFlat = applications.flat();
            const applicationsSorted = applicationsFlat.sort((a, b) => b.sentAt.getTime() - a.sentAt.getTime());
            if (applicationsSorted.length === 0) {
                return {
                    currentPage: 1,
                    lastPage: 1,
                    data: []
                }
            }
            const PER_PAGE = 12;
            const lastPage = Math.ceil(applicationsSorted.length / PER_PAGE);
            if (page > lastPage) throw new GraphQLError(`Jest tylko ${lastPage} stron`, { extensions: { code: 'VALIDATION_ERROR' } });
            const startIndex = (page - 1) * PER_PAGE;
            const endIndex = page * PER_PAGE;
            const data = applicationsSorted.slice(startIndex, endIndex);
            return {
                currentPage: page,
                lastPage,
                data
            }
        },
        async getApplication(__: unknown, { id }: { id: string }, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Użytkownik nie może otrzymywać aplikacji', { extensions: { code: 'FORBIDDEN' } });
            let application;
            try {
                application = await Application.findById(id).populate('offer user');
            } catch (err: any) {
                if (err.name === 'CastError' && err.kind === 'ObjectId') {
                    throw new GraphQLError('Nie znaleziono aplikacji', { extensions: { code: 'NOT_FOUND' } });
                }
                else {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
            if (!application) throw new GraphQLError('Nie znaleziono aplikacji', { extensions: { code: 'NOT_FOUND' } });
            const offer = application.offer as OfferI;
            if (offer.company.toString() !== new Types.ObjectId(company._id).toString()) throw new GraphQLError('To nie Twoja oferta', { extensions: { code: 'FORBIDDEN' } });
            application.CV = await getAWSResource(`cvs/${application.CV}`);
            return application;
        },
        async getMyApplicationsUser(__: unknown, _: unknown, context: MyContext) {
            const user = await contextAuthentication(context);
            if (user.isCompany) throw new GraphQLError('Firma nie może składać aplikacji', { extensions: { code: 'FORBIDDEN' } });
            const applications = await Application.find({ user: user._id }).populate({
                path: 'offer',
                populate: {
                    path: 'company',
                    model: 'Company'
                }
            }).populate('user').sort({ sentAt: -1 });
            const applicationsWithLogos = await Promise.all(applications.map(async application => {
                const offer = application.offer as OfferI;
                const company = offer.company as CompanyI;
                if (company.logo) {
                    company.logo = await getAWSResource(`logos/${company.logo}`);
                }
                offer.company = company;
                application.offer = offer;
                return application;
            }));
            return applicationsWithLogos;
        }
    },
    Mutation: {
        async sendApplication(__: unknown, applicationInput: ApplicationInput, context: MyContext) {
            await applicationValidation(applicationInput);
            let user;
            try {
                user = await contextAuthentication(context);
            } catch (err) {
                user = null;
            }
            if (user && user.isCompany) throw new GraphQLError('Firma nie może składać aplikacji', { extensions: { code: 'VALIDATION_ERROR' } });
            const { applicationInput: { name, surname, email, phoneNumber, cvUrl, details, offerId } } = applicationInput;
            const offer = await Offer.findById(offerId);
            if (!offer) throw new GraphQLError('Nie znaleziono oferty', { extensions: { code: 'NOT_FOUND' } });
            let applicationPopulated;
            try {
                const newApplication = await Application.create({ name, surname, email, phoneNumber, CV: cvUrl, details, offer: offerId, user: user && user._id });
                applicationPopulated = await newApplication.populate('offer user');
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
            const companyId = new Types.ObjectId(offer.company as string);
            const notification = new Notification({
                image: 'other/application.png',
                message: `Nowa aplikacja do oferty ${offer.title}`,
                redirect: '/moje-aplikacje-firma',
                companyRecipient: companyId
            });
            try {
                await notification.save();
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
            await context.pubsub.publish(`NOTIFICATION_${companyId.toString()}`, notification);
            return applicationPopulated;
        },
        async changeApplicationStatus(__: unknown, { input: { id, status } }: ApplicationChangeStatusInput, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Użytkownik nie może otrzymywać aplikacji', { extensions: { code: 'FORBIDDEN' } });
            if (status !== 'Oczekujące' && status !== 'Odrzucone' && status !== 'Zaakceptowane') throw new GraphQLError('Podaj poprawny status', { extensions: { code: 'VALIDATION_ERROR' } });
            let application;
            try {
                application = await Application.findById(id).populate('offer');
            } catch (err: any) {
                if (err.name === 'CastError' && err.kind === 'ObjectId') {
                    throw new GraphQLError('Nie znaleziono aplikacji', { extensions: { code: 'NOT_FOUND' } });
                }
                else {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
            if (!application) throw new GraphQLError('Nie znaleziono aplikacji', { extensions: { code: 'NOT_FOUND' } });
            const offer = application.offer as OfferI;
            if (offer.company.toString() !== new Types.ObjectId(company._id).toString()) throw new GraphQLError('To nie Twoja oferta', { extensions: { code: 'FORBIDDEN' } });
            application.status = status;
            try {
                await application.save();
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
            if (application.user) {
                const userId = new Types.ObjectId(application.user as string);
                const companyDB = await Company.findById(company._id);
                if (!companyDB) throw new GraphQLError('Firma nie istnieje', { extensions: { code: 'UNAUTHORIZED' } });
                const notification = new Notification({
                    image: companyDB.logo ? `logos/${companyDB.logo}` : '',
                    message: `${companyDB.companyName} zmienił status Twojej aplikacji na: ${status}`,
                    redirect: '/moje-aplikacje',
                    userRecipient: userId
                });
                try {
                    await notification.save();
                } catch (err) {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
                await context.pubsub.publish(`NOTIFICATION_${userId.toString()}`, notification);
            }
            return {
                success: true
            }
        }
    }
}