import { model, Schema, Types } from 'mongoose';

const offerThumbnailView = new Schema({
    offer: {
        type: Types.ObjectId,
        ref: 'Offer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('OfferThumbnailView', offerThumbnailView);