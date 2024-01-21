import dotenv from 'dotenv';
dotenv.config();
import { Application, Company, Message, Notification, Offer, OfferThumbnailView, OfferView, RefreshToken, Technology, User, Bookmark } from "../models";
import userSeeder from "./userSeeder";
import companySeeder from "./companySeeder";
import offerSeeder from './offerSeeder';
import technologySeeder from './technologySeeder';
import mongoose from "mongoose";
import analyticsSeeder from './analyticsSeeder';
import applicationSeeder from './applicationSeeder';
import messageSeeder from './messageSeeder';

async function truncate() {
    await Application.deleteMany();
    await Company.deleteMany();
    await Message.deleteMany();
    await Notification.deleteMany();
    await Offer.deleteMany();
    await OfferThumbnailView.deleteMany();
    await OfferView.deleteMany();
    await RefreshToken.deleteMany();
    await Technology.deleteMany();
    await User.deleteMany();
    await Bookmark.deleteMany();
}

async function main() {
    await mongoose.connect(process.env.MONGO_URL as string);
    await truncate();
    await userSeeder();
    await companySeeder();
    await offerSeeder();
    await technologySeeder();
    await analyticsSeeder();
    await applicationSeeder();
    await messageSeeder();

    console.log('DB Seeded');
}

main();