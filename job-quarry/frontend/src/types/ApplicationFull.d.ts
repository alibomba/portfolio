type ApplicationFull = {
    _id: string,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    CV: string,
    details?: string,
    user?: {
        _id: string,
        portfolio?: string
    },
    offer: {
        _id: string,
        title: string
    },
    status: string,
    sentAt: string
}