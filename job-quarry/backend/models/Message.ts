import { Document, model, Schema, Types } from 'mongoose';
import { CompanyI } from './Company';
import { UserI } from './User';

export interface MessageI extends Document {
    company: string | CompanyI,
    user: string | UserI,
    sender: string,
    content: string,
    sentAt: Date
}

const message = new Schema<MessageI>({
    company: {
        type: Types.ObjectId,
        ref: 'Company',
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: String,
        enum: ['User', 'Company'],
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 300
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Message', message);