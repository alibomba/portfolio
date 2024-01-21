type CompanySettingsInput = {
    settingsInput: {
        companyName: string,
        email: string,
        password?: string,
        website?: string,
        logo?: string,
        socialMedia: {
            facebook?: string,
            instagram?: string,
            linkedin?: string,
            github?: string
        },
        description?: string
    }
}

export default CompanySettingsInput;