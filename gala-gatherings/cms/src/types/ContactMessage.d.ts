type ContactMessage = {
    id: string,
    fullName: string,
    companyName: string | null,
    email: string,
    phoneNumber: string,
    subject: string,
    details: string,
    opened: boolean
}