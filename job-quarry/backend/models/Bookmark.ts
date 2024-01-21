import { model, Schema, Types } from 'mongoose';

const bookmark = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    offer: {
        type: Types.ObjectId,
        ref: 'Offer',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Bookmark', bookmark);