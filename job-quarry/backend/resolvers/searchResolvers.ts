import { Offer, Technology } from "../models";
import { OfferQueryType, OfferSearchInput } from "../types"
import searchValidation from "../utils/searchValidation"
import mapEnumToQuery from "../utils/mapEnumToQuery";
import getAWSResource from "../utils/getAWSResource";
import { GraphQLError } from "graphql";

export default {
    Query: {
        async search(__: unknown, searchInput: OfferSearchInput) {
            searchValidation(searchInput);
            const { searchInput: { phrase, city, level, contractType, mode, technologies, salaryFrom, salaryTo, page } } = searchInput;
            const query: OfferQueryType = {};
            if (phrase) {
                query.$or = [
                    { title: { $regex: phrase, $options: 'i' } },
                    { description: { $regex: phrase, $options: 'i' } }
                ];
            }
            if (city) {
                query.location = city;
            }
            if (level) {
                query.level = mapEnumToQuery('level', level);
            }
            if (contractType) {
                query.contractType = mapEnumToQuery('contractType', contractType);
            }
            if (mode) {
                query.mode = mapEnumToQuery('mode', mode);
            }
            if (technologies && technologies.length > 0) {
                query.requiredTechnologies = { $in: technologies };
            }
            if (salaryFrom && salaryTo) {
                query.salary = { $gte: salaryFrom, $lte: salaryTo };
            }
            if (salaryFrom && !salaryTo) {
                query.salary = { $gte: salaryFrom };
            }
            if (!salaryFrom && salaryTo) {
                query.salary = { $lte: salaryTo };
            }
            const PER_PAGE = 6;
            const count = await Offer.countDocuments(query);
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
            const offers = await Offer.find(query).skip(offset).limit(PER_PAGE).sort({ createdAt: -1 }).populate('company');
            const offersWithLogos = await Promise.all(offers.map(async offer => {
                if (typeof offer.company !== 'string' && offer.company.logo) {
                    offer.company.logo = await getAWSResource(`logos/${offer.company.logo}`);
                }
                return offer;
            }));
            return {
                currentPage: page,
                lastPage,
                data: offers
            }
        },
        async locationAutocomplete(__: unknown, { phrase }: { phrase: string }) {
            if (!phrase) return [];
            const regex = new RegExp(`^${phrase}`, 'i');
            return await Offer.distinct('location', { location: { $regex: regex } });
        },
        async getTechnologies() {
            const technologies = await Technology.find();
            return technologies.map(item => item.name);
        }
    }
}