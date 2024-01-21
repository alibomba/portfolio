import { model, Schema, Types } from 'mongoose';

const offerView = new Schema({
    offer: {
        type: Types.ObjectId,
        ref: 'Offer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('OfferView', offerView);