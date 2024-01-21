type UserProfile = {
    _id: string,
    profilePicture?: string,
    name: string,
    surname: string,
    age: number,
    email: string,
    skills: string[],
    socialMedia: {
        facebook?: string,
        instagram?: string,
        linkedin?: string,
        github?: string
    },
    description?: string,
    portfolio?: string,
    experience: Experience[]
}