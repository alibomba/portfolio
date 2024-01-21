import { Document, model, Schema, Types } from 'mongoose';

export interface NotificationI extends Document {
    image?: string,
    message: string,
    redirect: string,
    userRecipient?: string,
    companyRecipient?: string,
    seen: boolean,
    createdAt: Date
}

const notification = new Schema<NotificationI>({
    image: {
        type: String,
    },
    message: {
        type: String,
        required: true,
        maxLength: 100
    },
    redirect: {
        type: String,
        required: true,
        maxLength: 200
    },
    userRecipient: {
        type: Types.ObjectId,
        ref: 'User'
    },
    companyRecipient: {
        type: Types.ObjectId,
        ref: 'Company'
    },
    seen: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Notification', notification);