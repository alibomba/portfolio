import { Document, model, Schema } from 'mongoose';
import { Message, Offer } from '.';

export interface CompanyI extends Document {
    companyName: string,
    email: string,
    password: string,
    website?: string,
    logo?: string,
    socialMedia: {
        facebook?: string,
        instagram?: string,
        linkedin?: string,
        github?: string
    },
    description?: string,
    joinedAt: Date
}

const company = new Schema<CompanyI>({
    companyName: {
        type: String,
        required: true,
        unique: true,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 40
    },
    password: {
        type: String,
        required: true
    },
    website: {
        type: String,
        maxLength: 500
    },
    logo: {
        type: String
    },
    socialMedia: {
        facebook: {
            type: String,
            maxLength: 500
        },
        instagram: {
            type: String,
            maxLength: 500
        },
        linkedin: {
            type: String,
            maxLength: 500
        },
        github: {
            type: String,
            maxLength: 500
        }
    },
    description: {
        type: String,
        maxLength: 600
    },
    joinedAt: {
        type: Date,
        default: Date.now
    }
});

company.post('findOneAndDelete', async function (doc) {
    const messages = await Message.find({ company: doc._id });
    const offers = await Offer.find({ company: doc._id });
    for (let message of messages) {
        await Message.deleteOne({ _id: message._id });
    }
    for (let offer of offers) {
        await Offer.deleteOne({ _id: offer._id });
    }
});

export default model('Company', company);