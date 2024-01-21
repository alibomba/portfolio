import { GraphQLError } from "graphql";
import contextAuthentication from "../middleware/contextAuthentication"
import { Notification } from "../models";
import { MyContext } from "../types"
import { NotificationI } from "../models/Notification";
import getAWSResource from "../utils/getAWSResource";

export default {
    Query: {
        async getMyNotifications(__: unknown, args: unknown, context: MyContext) {
            const user = await contextAuthentication(context);
            let notifications = [];
            if (user.isCompany) {
                const notificationsFound = await Notification.find({ companyRecipient: user._id }).sort({ createdAt: -1 });
                for (let notification of notificationsFound) {
                    notifications.push({ _id: notification._id, image: notification.image, message: notification.message, redirect: notification.redirect, recipient: notification.companyRecipient, seen: notification.seen, createdAt: notification.createdAt });
                }
            } else {
                const notificationsFound = await Notification.find({ userRecipient: user._id }).sort({ createdAt: -1 });
                for (let notification of notificationsFound) {
                    notifications.push({ _id: notification._id, image: notification.image, message: notification.message, redirect: notification.redirect, recipient: notification.userRecipient, seen: notification.seen, createdAt: notification.createdAt });
                }
            }
            for (let notification of notifications) {
                if (notification.image) notification.image = await getAWSResource(notification.image);
            }
            return notifications;
        }
    },
    Mutation: {
        async setNotificationsToRead(__: unknown, args: unknown, context: MyContext) {
            const user = await contextAuthentication(context);
            let notifications;
            if (user.isCompany) {
                notifications = await Notification.find({ companyRecipient: user._id });
            } else {
                notifications = await Notification.find({ userRecipient: user._id });
            }
            for (let notification of notifications) {
                const notificationFound = await Notification.findById(notification._id);
                if (notificationFound) {
                    notificationFound.seen = true;
                    try {
                        await notificationFound.save();
                    } catch (err) {
                        throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                    }
                }
            }
            return {
                success: true
            }
        }
    },
    Subscription: {
        notificationCreated: {
            async subscribe(__: unknown, args: unknown, context: MyContext) {
                const user = await contextAuthentication(context);
                return context.pubsub.asyncIterator(`NOTIFICATION_${user._id.toString()}`);
            },
            resolve: async (payload: NotificationI) => {
                if (payload.image) payload.image = await getAWSResource(payload.image);
                return payload;
            }
        }
    }
}