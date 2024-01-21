import { gql } from "@apollo/client";

export const USER_REGISTER = gql`
    mutation($userRegisterInput: UserRegisterInput!){
        userRegister(userRegisterInput: $userRegisterInput){
            success
        }
    }
`;

export const COMPANY_REGISTER = gql`
    mutation($companyRegisterInput: CompanyRegisterInput!){
        companyRegister(companyRegisterInput: $companyRegisterInput){
            success
        }
    }
`;

export const LOGIN = gql`
    mutation($loginInput: LoginInput!){
        login(loginInput: $loginInput){
            accessToken
            refreshToken
            isCompany
        }
    }
`;

export const LOGOUT = gql`
    mutation($refreshToken: String!){
        logout(refreshToken: $refreshToken){
            success
        }
    }
`;

export const REFRESH_TOKEN = gql`
    mutation($refreshToken: String!){
        refreshToken(refreshToken: $refreshToken){
            accessToken
        }
    }
`;

export const SET_NOTIFICATIONS_TO_READ = gql`
    mutation{
        setNotificationsToRead{
            success
        }
    }
`;

export const BOOKMARK = gql`
    mutation($bookmarkId: String!){
        bookmark(id: $bookmarkId){
            isBookmarked
        }
    }
`;

export const SEND_APPLICATION = gql`
    mutation($applicationInput: ApplicationInput!){
        sendApplication(applicationInput: $applicationInput){
            _id
        }
    }
`;

export const DELETE_OFFER = gql`
    mutation($deleteOfferId: String!){
        deleteOffer(id: $deleteOfferId){
            success
        }
    }
`;

export const ADD_THUMBNAIL_VIEW = gql`
    mutation($addThumbnailViewId: String!){
        addThumbnailView(id: $addThumbnailViewId){
            success
        }
    }
`;

export const ADD_VIEW = gql`
    mutation($addViewId: String!){
        addView(id: $addViewId){
            success
        }
    }
`;

export const CHANGE_APPLICATION_STATUS = gql`
    mutation($input: ApplicationChangeStatusInput!){
        changeApplicationStatus(input: $input){
            success
        }
    }
`;

export const UPDATE_COMPANY_SETTINGS = gql`
    mutation($settingsInput: CompanySettingsInput!){
        updateCompanySettings(settingsInput: $settingsInput){
            success
        }
    }
`;

export const CREATE_OFFER = gql`
    mutation($input: CreateOfferInput!){
        createOffer(input: $input){
            _id
        }
    }
`;

export const UPDATE_OFFER = gql`
    mutation($input: UpdateOfferInput!){
        updateOffer(input: $input){
            _id
        }
    }
`;

export const UPDATE_USER_SETTINGS = gql`
    mutation($settingsInput: UserSettingsInput!){
        updateUserSettings(settingsInput: $settingsInput){
            success
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation($messageInput: MessageInput!){
        sendMessage(messageInput: $messageInput){
            _id
            isMine
            content
        }
    }
`;