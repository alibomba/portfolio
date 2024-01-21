import { Document, model, Schema, Types } from 'mongoose';
import { UserI } from './User';
import { OfferI } from './Offer';

export interface ApplicationI extends Document {
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    CV: string,
    details?: string,
    user: string | UserI,
    offer: string | OfferI,
    status: string,
    sentAt: Date
}

const application = new Schema<ApplicationI>({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    surname: {
        type: String,
        required: true,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        maxLength: 40
    },
    phoneNumber: {
        type: String,
        required: true,
        maxLength: 25
    },
    CV: {
        type: String,
        required: true
    },
    details: {
        type: String,
        maxLength: 300
    },
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    offer: {
        type: Types.ObjectId,
        ref: 'Offer',
        required: true
    },
    status: {
        type: String,
        enum: ['Oczekujące', 'Odrzucone', 'Zaakceptowane'],
        default: 'Oczekujące'
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Application', application);