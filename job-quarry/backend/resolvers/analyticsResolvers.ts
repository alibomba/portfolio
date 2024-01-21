import { GraphQLError } from "graphql";
import { Application, Offer, OfferThumbnailView, OfferView } from "../models";
import { AnalyticsInput, MyContext } from "../types";
import contextAuthentication from "../middleware/contextAuthentication";
import { MongooseError } from "mongoose";
import getAnalyticsDateQuery from "../utils/getAnalyticsDateQuery";
import { UserI } from "../models/User";
import applicationMutations from "../typeDefs/mutationTypes/applicationMutations";


export default {
    Query: {
        async getAnalytics(__: unknown, { analyticsInput: { id, startDate, endDate } }: AnalyticsInput, context: MyContext) {
            const company = await contextAuthentication(context);
            if (!company.isCompany) throw new GraphQLError('Musisz być firmą', { extensions: { code: 'FORBIDDEN' } });
            let offer;
            try {
                offer = await Offer.findById(id).populate('company');
            } catch (err: any) {
                if (err.name === 'CastError' && err.kind === 'ObjectId') {
                    throw new GraphQLError('Oferta nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                }
                else {
                    throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                }
            }
            if (!offer) throw new GraphQLError('Oferta nie istnieje', { extensions: { code: 'NOT_FOUND' } });
            if (typeof offer.company !== 'string' && offer.company._id != company._id) throw new GraphQLError('Nie masz dostępu do statystyk tej oferty', { extensions: { code: 'FORBIDDEN' } });
            const createdAtDateQuery = getAnalyticsDateQuery(startDate, endDate, 'createdAt');
            const sentAtDateQuery = getAnalyticsDateQuery(startDate, endDate, 'sentAt');
            const views = await OfferView.find({ offer: offer._id, ...createdAtDateQuery }).countDocuments();
            const thumbnailViews = await OfferThumbnailView.find({ offer: offer._id, ...createdAtDateQuery }).countDocuments();
            const thumbnailViewsMinusViews = thumbnailViews - views;
            const CTR = {
                percentage: thumbnailViews > 0 && ((views / thumbnailViews) * 100).toFixed(1),
                thumbnailViewsMinusViews,
                views
            };
            const applications = await Application.find({ offer: offer._id, ...sentAtDateQuery }).populate('user');
            const applicantsCategories = {
                notSpecified: applications.filter(application => !application.user).length,
                first: applications.filter(application => {
                    if (application.user) {
                        const user = application.user as UserI;
                        if (user.age >= 18 && user.age <= 24) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    return false;
                }).length,
                second: applications.filter(application => {
                    if (application.user) {
                        const user = application.user as UserI;
                        if (user.age >= 25 && user.age <= 34) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    return false;
                }).length,
                third: applications.filter(application => {
                    if (application.user) {
                        const user = application.user as UserI;
                        if (user.age >= 35 && user.age <= 44) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    return false;
                }).length,
                fourth: applications.filter(application => {
                    if (application.user) {
                        const user = application.user as UserI;
                        if (user.age >= 45 && user.age <= 54) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    return false;
                }).length,
                fifth: applications.filter(application => {
                    if (application.user) {
                        const user = application.user as UserI;
                        if (user.age >= 55 && user.age <= 64) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    return false;
                }).length,
                sixth: applications.filter(application => {
                    if (application.user) {
                        const user = application.user as UserI;
                        if (user.age >= 65) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    return false;
                }).length
            }
            return {
                totalViews: views,
                CTR,
                applications: applications.length,
                applicationsToViews: views > 0 && ((applications.length / views) * 100).toFixed(1),
                applicantsCategories
            }
        }
    },
    Mutation: {
        async addThumbnailView(__: unknown, { id }: { id: string }) {
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
            try {
                await OfferThumbnailView.create({ offer: offer._id });
                return {
                    success: true
                }
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
        },
        async addView(__: unknown, { id }: { id: string }) {
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
            try {
                await OfferView.create({ offer: offer._id });
                return {
                    success: true
                }
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
        }
    }
}