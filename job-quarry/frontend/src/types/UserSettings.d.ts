interface SettingsExperience {
    title: string,
    company: string,
    startDate: string,
    endDate: string,
    endDateChecked: boolean,
    description: string
}

type UserSettings = {
    name: string,
    surname: string,
    email: string,
    age: string,
    profilePicture?: string
    password: string,
    passwordConfirmation: string,
    description: string,
    portfolio: string,
    socialMedia: {
        facebook: string,
        instagram: string,
        linkedin: string,
        github: string
    },
    skills: string[],
    experience: SettingsExperience[]
}