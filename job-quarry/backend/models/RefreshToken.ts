import { model, Schema } from 'mongoose';

const refreshToken = new Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    issuedAt: {
        type: Date,
        default: Date.now
    }
});

export default model('RefreshToken', refreshToken);