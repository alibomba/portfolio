import notificationSubscriptions from "./notificationSubscriptions";
import messageSubscriptions from "./messageSubscriptions";

export default `#graphql
    type Subscription{
        ${notificationSubscriptions}
        ${messageSubscriptions}
    }
`;