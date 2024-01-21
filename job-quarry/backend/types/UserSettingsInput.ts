type Experience = {
    title: string,
    company: string,
    startDate: string,
    endDate?: string,
    description: string
}

type UserSettingsInput = {
    settingsInput: {
        name: string,
        surname: string,
        email: string,
        age: number,
        profilePicture?: string,
        password?: string,
        description: string,
        portfolio: string,
        socialMedia: {
            facebook?: string,
            instagram?: string,
            linkedin?: string,
            github?: string
        },
        skills: string[],
        experience: Experience[]
    }
}

export default UserSettingsInput;