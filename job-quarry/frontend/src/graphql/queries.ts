import { gql } from "@apollo/client";

export const GET_AUTH = gql`
    query{
        getAuth{
            isCompany
        }
    }
`;

export const GET_MY_NOTIFICATIONS = gql`
    query{
        getMyNotifications{
            _id
            image
            message
            redirect
            seen
        }
    }
`;

export const LOCATION_AUTOCOMPLETE = gql`
    query($phrase: String!){
        locationAutocomplete(phrase: $phrase)
    }
`;

export const GET_TECHNOLOGIES = gql`
    query{
        getTechnologies
    }
`;

export const OFFER_SEARCH = gql`
    query($searchInput: OfferSearchInput!){
        search(searchInput: $searchInput){
            currentPage
            lastPage
            data{
                _id
                title
                company{
                    companyName
                    logo
                }
                mode
                location
                requiredTechnologies
                salary
            }
        }
    }
`;

export const IS_BOOKMARKED = gql`
    query($isBookmarkedId: String!){
        isBookmarked(id: $isBookmarkedId){
            success
        }
    }
`;

export const GET_OFFER = gql`
    query($getOfferId: String!){
        getOffer(id: $getOfferId){
            _id
            title
            company{
                _id
                companyName
                logo
            }
            mode
            location
            level
            expiresAt
            contractType
            salary
            requiredTechnologies
            optionalTechnologies
            description
            tasks
            required
            optional
            benefits
            recruitmentStages
        }
    }
`;

export const GET_USER_PROFILE = gql`
    query($getUserId: String!){
        getUser(id: $getUserId){
            _id
            profilePicture
            name
            surname
            age
            email
            skills
            socialMedia{
                facebook
                instagram
                linkedin
                github
            }
            description
            portfolio
            experience{
                title
                company
                startDate
                endDate
                description
            }
        }
    }
`;

export const GET_COMPANY_PROFILE = gql`
    query($getCompanyId: String!){
        getCompany(id: $getCompanyId){
            _id
            logo
            companyName
            socialMedia{
                facebook
                instagram
                linkedin
                github
            }
            description
            website
            offers{
                _id
                title
                mode
                location
                requiredTechnologies
                salary
            }
        }
    }
`;

export const GET_MY_OFFERS = gql`
    query{
        myOffers{
            _id
            title
            salary
            level
            contractType
            expiresAt
        }
    }
`;

export const GET_MY_APPLICATIONS_COMPANY = gql`
    query($page: Int!){
        getMyApplicationsCompany(page: $page){
            currentPage
            lastPage
            data{
                _id
                name
                surname
                email
                offer{
                    title
                }
            }
        }
    }
`;

export const GET_APPLICATION_COMPANY = gql`
    query($getApplicationId: String!){
        getApplication(id: $getApplicationId){
            _id
            name
            surname
            email
            phoneNumber
            CV
            details
            user{
                _id
                portfolio
            }
            offer{
                _id
                title
            }
            status
            sentAt
        }
    }
`;

export const GET_COMPANY_SETTINGS = gql`
    query{
        getMeCompany{
            _id
            logo
            companyName
            email
            socialMedia{
                facebook
                instagram
                linkedin
                github
            }
            description
            website
        }
    }
`;

export const GET_USER_SETTINGS = gql`
    query{
        getMeUser{
            _id
            name
            surname
            email
            age
            profilePicture
            description
            portfolio
            socialMedia{
                facebook
                instagram
                linkedin
                github
            }
            skills
            experience{
                title
                company
                startDate
                endDate
                description
            }
        }
    }
`;

export const GET_MY_APPLICATIONS_USER = gql`
    query{
        getMyApplicationsUser{
            _id
            offer{
                _id
                title
                company{
                    _id
                    logo
                }
                salary
            }
            status
        }
    }
`;

export const GET_ANALYTICS = gql`
    query($analyticsInput: AnalyticsInput!){
        getAnalytics(analyticsInput: $analyticsInput){
            totalViews
            CTR{
                percentage
                thumbnailViewsMinusViews
                views
            }
            applications
            applicationsToViews
            applicantsCategories{
                notSpecified
                first
                second
                third
                fourth
                fifth
                sixth
            }
        }
    }
`;

export const GET_MY_BOOKMARKS = gql`
    query($page: Int!){
        getMyBookmarks(page: $page){
            currentPage
            lastPage
            data{
                _id
                title
                company{
                    companyName
                    logo
                }
                mode
                location
                requiredTechnologies
                salary
            }
        }
    }
`;

export const GET_CHATS = gql`
    query($currentConversation: String){
        getChats(currentConversation: $currentConversation){
            conversations{
                _id
                image
                isCompany
                name
            }
            messages{
                _id
                isMine
                content
            }
        }
    }
`;