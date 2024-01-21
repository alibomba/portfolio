import { gql } from "@apollo/client";

export const NOTIFICATION_SUBSCRIPTION = gql`
    subscription{
        notificationCreated{
            _id
            image
            message
            redirect
            seen
        }
    }
`;

export const MESSAGE_SUBSCRIPTION = gql`
    subscription{
        messageCreated{
            _id
            content
            isMine
            senderId
        }
    }
`;