import { GraphQLError } from "graphql";
import contextAuthentication from "../middleware/contextAuthentication"
import { MyContext, CreateOfferInput, UpdateOfferInput } from "../types"
import { Bookmark, Offer } from "../models";
import offerValidation from "../utils/offerValidation";
import mapEnumToQuery from "../utils/mapEnumToQuery";
import { OfferI } from "../models/Offer";
import { CompanyI } from "../models/Company";
import getAWSResource from "../utils/getAWSResource";

export default {
    Query: {
        async isBookmarked(__: unknown, { id }: { id: string }, context: MyContext) {
            const user = await contextAuthentication(context);
            if (user.isCompany) throw new GraphQLError('Firma nie może mieć zapisanych ofert', { extensions: { code: 'VALIDATION_ERROR' } });
            try {
                const offer = await Offer.findById(id);
                if (!offer) throw new GraphQLError('Nie znaleziono oferty', { extensions: { code: 'NOT_FOUND' } });
            } catch (err: any) {
                if (err.name === 'CastError' && err.kind === 'ObjectId') {
                    throw new GraphQLError('Nie znaleziono oferty', { extensions: { code: 'NOT_FOUND' } });
                }
                else {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
            const bookmarkFound = await Bookmark.findOne({ user: user._id, offer: id });
            let success;
            if (bookmarkFound) success = true;
            else success = false;
            return {
                success
            }
        },
        async getOffer(__: unknown, { id }: { id: string }) {
            let offer;
            try {
                offer = await Offer.findById(id).populate('company');
            } catch (err: any) {
                if (err.name === 'CastError' && err.kind === 'ObjectId') {
                    throw new GraphQLError('Nie znaleziono oferty', { extensions: { code: 'NOT_FOUND' } });
                } else {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
            if (!offer) throw new GraphQLError('Nie znaleziono oferty', { extensions: { code: 'NOT_FOUND' } });
            if (typeof offer.company !== 'string' && offer.company.logo) {
                offer.company.logo = await getAWSResource(`logos/${offer.company.logo}`);
            }
            return offer;
        },
        async myOffers(__: unknown, _: unknown, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Użytkownik nie może mieć swoich ofert', { extensions: { code: 'FORBIDDEN' } });
            const offers = await Offer.find({ company: company._id }).populate('company').sort({ createdAt: -1 });
            return offers;
        },
        async getMyBookmarks(__: unknown, { page }: { page: number }, context: MyContext) {
            const user = await contextAuthentication(context);
            if (user.isCompany) throw new GraphQLError('Firma nie może mieć zapisanych ofert', { extensions: { code: 'VALIDATION_ERROR' } });
            const PER_PAGE = 6;
            const count = await Bookmark.countDocuments({ user: user._id });
            const lastPage = Math.ceil(count / PER_PAGE);
            if (count === 0) {
                return {
                    currentPage: 1,
                    lastPage: 1,
                    data: []
                }
            }
            if (page > lastPage) throw new GraphQLError(`Jest tylko ${lastPage} stron`, { extensions: { code: 'VALIDATION_ERROR' } });
            const offset = (page - 1) * PER_PAGE;
            const bookmarks = await Bookmark.find({ user: user._id }).skip(offset).limit(PER_PAGE).sort({ createdAt: -1 }).populate({ path: 'offer', populate: { path: 'company', model: 'Company' } });
            const offers = bookmarks.map(bookmark => bookmark.offer as OfferI);
            const offersWithLogos = await Promise.all(offers.map(async offer => {
                const company = offer.company as CompanyI;
                if (company.logo) {
                    company.logo = await getAWSResource(`logos/${company.logo}`);
                    offer.company = company;
                }
                return offer;
            }));
            return {
                currentPage: page,
                lastPage,
                data: offersWithLogos
            }
        }
    },
    Mutation: {
        async bookmark(__: unknown, { id }: { id: string }, context: MyContext) {
            const user = await contextAuthentication(context);
            if (user.isCompany) throw new GraphQLError('Firma nie może mieć zapisanych ofert', { extensions: { code: 'VALIDATION_ERROR' } });
            let offer;
            try {
                offer = await Offer.findById(id);
                if (!offer) throw new GraphQLError('Nie znaleziono oferty', { extensions: { code: 'NOT_FOUND' } });
            } catch (err: any) {
                if (err.name === 'CastError' && err.kind === 'ObjectId') {
                    throw new GraphQLError('Nie znaleziono oferty', { extensions: { code: 'NOT_FOUND' } });
                }
                else {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
            const bookmarkFound = await Bookmark.findOne({ user: user._id, offer: id });
            if (bookmarkFound) {
                try {
                    await Bookmark.deleteOne({ _id: bookmarkFound._id });
                    return {
                        isBookmarked: false
                    }
                } catch (err) {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            } else {
                try {
                    await Bookmark.create({ user: user._id, offer: offer._id });
                    return {
                        isBookmarked: true
                    }
                } catch (err) {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
        },
        async createOffer(__: unknown, input: CreateOfferInput, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Użytkownik nie może dodawać ofert', { extensions: { code: 'FORBIDDEN' } });
            offerValidation(input);
            const { input: { title, mode, location, level, expiresAt, contractType, salary, requiredTechnologies, optionalTechnologies, description, tasks, required, optional, benefits, recruitmentStages } } = input;
            const newOffer = new Offer({
                title,
                mode: mapEnumToQuery('mode', mode),
                location,
                level: mapEnumToQuery('level', level),
                expiresAt: new Date(expiresAt),
                contractType: mapEnumToQuery('contractType', contractType),
                salary,
                requiredTechnologies,
                optionalTechnologies,
                description,
                tasks,
                required,
                optional,
                benefits,
                recruitmentStages,
                company: company._id
            });
            try {
                await newOffer.save();
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
            return await newOffer.populate('company');
        },
        async updateOffer(__: unknown, input: UpdateOfferInput, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Użytkownik nie może edytować ofert', { extensions: { code: 'FORBIDDEN' } });
            const { input: { id } } = input;
            if (!id) throw new GraphQLError('Identyfikator oferty jest wymagany', { extensions: { code: 'VALIDATION_ERROR' } });
            let offer;
            try {
                offer = await Offer.findById(id);
            } catch (err: any) {
                if (err.name === 'CastError' && err.kind === 'ObjectId') {
                    throw new GraphQLError('Oferta nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                }
                else {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
            if (!offer) throw new GraphQLError('Oferta nie istnieje', { extensions: { code: 'NOT_FOUND' } });
            offerValidation(input);
            const { input: { title, mode, location, level, expiresAt, contractType, salary, requiredTechnologies, optionalTechnologies, description, tasks, required, optional, benefits, recruitmentStages } } = input;
            offer.title = title;
            offer.mode = mapEnumToQuery('mode', mode) as string;
            offer.location = location;
            offer.level = mapEnumToQuery('level', level) as string;
            offer.expiresAt = new Date(expiresAt);
            offer.contractType = mapEnumToQuery('contractType', contractType) as string;
            offer.salary = salary;
            offer.requiredTechnologies = requiredTechnologies;
            offer.optionalTechnologies = optionalTechnologies;
            offer.description = description;
            offer.tasks = tasks;
            offer.required = required;
            offer.optional = optional;
            offer.benefits = benefits;
            offer.recruitmentStages = recruitmentStages;
            try {
                await offer.save();
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
            return await offer.populate('company');
        },
        async deleteOffer(__: unknown, { id }: { id: string }, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Użytkownik nie może usuwać ofert', { extensions: { code: 'FORBIDDEN' } });
            let offer;
            try {
                offer = await Offer.findById(id).populate('company');
            } catch (err: any) {
                if (err.name === 'CastError' && err.kind === 'ObjectId') {
                    throw new GraphQLError('Nie znaleziono oferty', { extensions: { code: 'NOT_FOUND' } });
                }
                else {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
            if (!offer) throw new GraphQLError('Nie znaleziono oferty', { extensions: { code: 'NOT_FOUND' } });
            if (typeof offer.company !== 'string' && offer.company._id != company._id) throw new GraphQLError('Nie możesz usunąć nie swojej oferty', { extensions: { code: 'FORBIDDEN' } });
            try {
                await Offer.findOneAndDelete({ _id: offer._id });
                return {
                    success: true
                }
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
        }
    }
}