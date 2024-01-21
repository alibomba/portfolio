import { GraphQLError } from "graphql";


function getAnalyticsDateQuery(startDate: string | undefined, endDate: string | undefined, field: 'createdAt' | 'sentAt') {
    let dateQuery = {};
    if (startDate && new Date() < new Date(startDate)) {
        throw new GraphQLError('Data początkowa nie może być w przyszłości', { extensions: { code: 'VALIDATION_ERROR' } })
    }
    if (endDate && new Date() < new Date(endDate)) {
        throw new GraphQLError('Data końcowa nie może być w przyszłości', { extensions: { code: 'VALIDATION_ERROR' } })
    }
    if (startDate && !endDate) {
        if (field === 'createdAt') {
            dateQuery = { createdAt: { $gte: new Date(startDate) } };
        }
        else {
            dateQuery = { sentAt: { $gte: new Date(startDate) } };
        }

    }
    if (!startDate && endDate) {
        if (field === 'createdAt') {
            dateQuery = { createdAt: { $lte: new Date(endDate) } };
        }
        else {
            dateQuery = { sentAt: { $lte: new Date(endDate) } };
        }
    }
    if (startDate && endDate) {
        if (field === 'createdAt') {
            dateQuery = { createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } };
        }
        else {
            dateQuery = { sentAt: { $gte: new Date(startDate), $lte: new Date(endDate) } };
        }
    }
    return dateQuery;
}

export default getAnalyticsDateQuery;