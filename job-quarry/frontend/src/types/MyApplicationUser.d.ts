type MyApplicationUser = {
    _id: string,
    offer: {
        _id: string,
        title: string,
        company: {
            _id: string,
            logo?: string
        }
        salary: number,
    },
    status: string
}