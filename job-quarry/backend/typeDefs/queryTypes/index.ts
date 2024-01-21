import authQueries from "./authQueries";
import notificationQueries from "./notificationQueries";
import offerQueries from "./offerQueries";
import searchQueries from "./searchQueries";
import userQueries from "./userQueries";
import companyQueries from "./companyQueries";
import applicationQueries from "./applicationQueries";
import settingsQueries from "./settingsQueries";
import analyticsQueries from "./analyticsQueries";
import messageQueries from "./messageQueries";

export default `#graphql
    type Query{
        ${authQueries}
        ${notificationQueries}
        ${offerQueries}
        ${searchQueries}
        ${userQueries}
        ${companyQueries}
        ${applicationQueries}
        ${settingsQueries}
        ${analyticsQueries}
        ${messageQueries}
        getTechnologies: [String!]!
    }
`;