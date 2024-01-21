import { Document, model, Schema, Types } from 'mongoose';
import { Application, OfferThumbnailView, OfferView } from '.';
import { CompanyI } from './Company';

export interface OfferI extends Document {
    title: string,
    mode: string,
    location: string,
    level: string,
    expiresAt: Date,
    contractType: string,
    salary: number,
    requiredTechnologies: string[],
    optionalTechnologies: string[],
    description: string,
    tasks: string[],
    required: string[],
    optional: string[],
    benefits: string[],
    recruitmentStages: string[],
    company: string | CompanyI,
    createdAt: Date
}

const offer = new Schema<OfferI>({
    title: {
        type: String,
        required: true,
        maxLength: 40
    },
    mode: {
        type: String,
        enum: ['Stacjonarnie', 'Zdalnie', 'Hybrydowo'],
        required: true
    },
    location: {
        type: String,
        required: true,
        maxLength: 40
    },
    level: {
        type: String,
        enum: ['Junior', 'Mid', 'Senior'],
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    contractType: {
        type: String,
        enum: ['Tymczasowa', 'Umowa o Pracę', 'Umowa o dzieło', 'Umowa zlecenie', 'Praktyki zawodowe', 'B2B', 'Staż'],
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    requiredTechnologies: {
        type: [String],
        default: []
    },
    optionalTechnologies: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        required: true,
        maxLength: 600
    },
    tasks: {
        type: [String],
        default: []
    },
    required: {
        type: [String],
        default: []
    },
    optional: {
        type: [String],
        default: []
    },
    benefits: {
        type: [String],
        default: []
    },
    recruitmentStages: {
        type: [String],
        default: []
    },
    company: {
        type: Types.ObjectId,
        ref: 'Company',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

offer.post('findOneAndDelete', async function (doc) {
    const applications = await Application.find({ offer: doc._id });
    const thumbnailViews = await OfferThumbnailView.find({ offer: doc._id });
    const views = await OfferView.find({ offer: doc._id });

    for (let application of applications) {
        await Application.deleteOne({ _id: application._id });
    }
    for (let view of thumbnailViews) {
        await OfferThumbnailView.deleteOne({ _id: view._id });
    }
    for (let view of views) {
        await OfferView.deleteOne({ _id: view._id });
    }
});

export default model('Offer', offer);