import { GraphQLError } from "graphql";
import contextAuthentication from "../middleware/contextAuthentication"
import { Company, Message, Notification, User } from "../models";
import { MyContext, Message as MessageType, MessageInput } from "../types"
import getAWSResource from "../utils/getAWSResource";



export default {
    Query: {
        async getChats(__: unknown, { currentConversation }: { currentConversation?: string }, context: MyContext) {
            const user = await contextAuthentication(context);
            let messages: MessageType[];
            let conversations;
            if (user.isCompany) {
                const conversationsResponse = await Message.find({ company: user._id }).distinct('user').sort({ sentAt: -1 });
                conversations = await Promise.all(conversationsResponse.map(async item => {
                    const userDB = await User.findById(item);
                    if (!userDB) return;
                    return {
                        _id: userDB._id,
                        image: userDB.profilePicture && await getAWSResource(`pfp/${userDB.profilePicture}`),
                        isCompany: false,
                        name: `${userDB.name} ${userDB.surname}`
                    }
                }));

                let conversation;
                if (currentConversation) {
                    let userFound;
                    try {
                        userFound = await User.findById(currentConversation);
                    } catch (err: any) {
                        if (err.name === 'CastError' && err.kind === 'ObjectId') {
                            throw new GraphQLError('Użytkownik nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                        }
                        else {
                            throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                        }
                    }
                    if (!userFound) throw new GraphQLError('Użytkownik nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                    conversation = currentConversation;
                }
                else {
                    if (conversationsResponse.length > 0) conversation = conversationsResponse[0];
                }
                if (conversation) {
                    const messagesResponse = await Message.find({ company: user._id, user: conversation }).sort({ sentAt: 1 });
                    messages = messagesResponse.map(item => {
                        return {
                            _id: item._id,
                            isMine: item.sender === 'Company',
                            content: item.content
                        }
                    });
                }
                else {
                    messages = [];
                }
            }
            else {
                const conversationsResponse = await Message.find({ user: user._id }).distinct('company').sort({ sentAt: -1 });
                conversations = await Promise.all(conversationsResponse.map(async item => {
                    const companyDB = await Company.findById(item);
                    if (!companyDB) return;
                    return {
                        _id: companyDB._id,
                        image: companyDB.logo && await getAWSResource(`logos/${companyDB.logo}`),
                        isCompany: true,
                        name: companyDB.companyName
                    }
                }));

                let conversation;
                if (currentConversation) {
                    let companyFound;
                    try {
                        companyFound = await Company.findById(currentConversation);
                    } catch (err: any) {
                        if (err.name === 'CastError' && err.kind === 'ObjectId') {
                            throw new GraphQLError('Firma nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                        }
                        else {
                            throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                        }
                    }
                    if (!companyFound) throw new GraphQLError('Firma nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                    conversation = currentConversation;
                }
                else {
                    if (conversationsResponse.length > 0) conversation = conversationsResponse[0];
                }
                if (conversation) {
                    const messagesResponse = await Message.find({ user: user._id, company: conversation }).sort({ sentAt: 1 });
                    messages = messagesResponse.map(item => {
                        return {
                            _id: item._id,
                            isMine: item.sender === 'User',
                            content: item.content
                        }
                    });
                }
                else {
                    messages = [];
                }
            }
            return {
                conversations,
                messages
            }
        }
    },
    Mutation: {
        async sendMessage(__: unknown, { messageInput: { recipient: recipientId, content } }: MessageInput, context: MyContext) {
            const user = await contextAuthentication(context);
            if (content.length > 300) throw new GraphQLError('Wiadomość może mieć maksymalnie 300 znaków', { extensions: { code: 'VALIDATION_ERROR' } });
            let newMessage;
            let notification;
            if (user.isCompany) {
                let recipient;
                try {
                    recipient = await User.findById(recipientId);
                } catch (err: any) {
                    if (err.name === 'CastError' && err.kind === 'ObjectId') {
                        throw new GraphQLError('Użytkownik nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                    }
                    else {
                        throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                    }
                }
                if (!recipient) throw new GraphQLError('Użytkownik nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                newMessage = new Message({ company: user._id, user: recipientId, sender: 'Company', content });
                const me = await Company.findById(user._id);
                if (!me) throw new GraphQLError('Firma nie istnieje', { extensions: { code: 'UNAUTHORIZED' } });
                notification = new Notification({ image: me.logo ? `logos/${me.logo}` : '', message: `${me.companyName} wysłał Ci wiadomość`, redirect: `/czaty?id=${user._id}`, userRecipient: recipientId });
            }
            else {
                let recipient;
                try {
                    recipient = await Company.findById(recipientId);
                } catch (err: any) {
                    if (err.name === 'CastError' && err.kind === 'ObjectId') {
                        throw new GraphQLError('Firma nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                    }
                    else {
                        throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
                    }
                }
                if (!recipient) throw new GraphQLError('Firma nie istnieje', { extensions: { code: 'NOT_FOUND' } });
                newMessage = new Message({ company: recipientId, user: user._id, sender: 'User', content });
                const me = await User.findById(user._id);
                if (!me) throw new GraphQLError('Użytkownik nie istnieje', { extensions: { code: 'UNAUTHORIZED' } });
                notification = new Notification({ image: me.profilePicture ? `pfp/${me.profilePicture}` : '', message: `${me.name} ${me.surname} wysłał Ci wiadomość`, redirect: `/czaty?id=${user._id}`, companyRecipient: recipientId });
            }
            try {
                await newMessage.save();
                await notification.save();
            } catch (err) {
                throw new GraphQLError('', { extensions: { code: 'SERVER_ERROR' } });
            }
            const message = {
                _id: newMessage._id,
                content
            }
            await context.pubsub.publish(`NOTIFICATION_${recipientId}`, notification);
            await context.pubsub.publish(`MESSAGE_${recipientId}`, { ...message, isMine: false, senderId: user._id });
            return {
                ...message,
                isMine: true
            };
        }
    },
    Subscription: {
        messageCreated: {
            async subscribe(__: unknown, args: unknown, context: MyContext) {
                const user = await contextAuthentication(context);
                return context.pubsub.asyncIterator(`MESSAGE_${user._id.toString()}`);
            },
            resolve: (payload: any) => payload
        }
    }
}