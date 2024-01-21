import { Company } from "../models";

async function companySeeder() {
    await Company.insertMany([
        {
            _id: '6597d2f7a0eeb1a05d7233b0',
            email: 'tech@gmail.com',
            companyName: 'Tech sp.z.o.o',
            password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq',
            website: "https://tech.com",
            logo: 'tech-spzoo.png',
            socialMedia: {
                facebook: "https://facebook.com/tech-spzoo",
                instagram: "https://instagram.com/tech-spzoo",
                linkedin: "https://linkedin.com/company/tech-spzoo",
                github: "https://github.com/tech-spzoo"
            },
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. "
        },
        {
            _id: '61f8dce5e7a83129bcdb3f1a',
            companyName: 'Tech Solutions',
            email: 'techsolutions@example.com',
            password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq',
            website: 'https://techsolutions.com',
            socialMedia: {
                facebook: 'https://facebook.com/techsolutions',
                instagram: 'https://instagram.com/techsolutions',
                linkedin: 'https://linkedin.com/company/techsolutions',
                github: 'https://github.com/techsolutions'
            },
            description: 'Leading technology solutions provider.'
        },
        {
            _id: '61f8dce5e7a83129bcdb3f1b',
            companyName: 'Innovate Labs',
            email: 'innovatelabs@example.com',
            password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq',
            website: 'https://innovatelabs.io',
            socialMedia: {
                facebook: 'https://facebook.com/innovatelabs',
                instagram: 'https://instagram.com/innovatelabs',
                linkedin: 'https://linkedin.com/company/innovatelabs',
                github: 'https://github.com/innovatelabs'
            },
            description: 'Fostering innovation through cutting-edge solutions.'
        },
        {
            _id: '61f8dce5e7a83129bcdb3f1c',
            companyName: 'Dynamic Solutions',
            email: 'dynamicsolutions@example.com',
            password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq',
            website: 'https://dynamicsolutions.co',
            socialMedia: {
                facebook: 'https://facebook.com/dynamicsolutions',
                instagram: 'https://instagram.com/dynamicsolutions',
                linkedin: 'https://linkedin.com/company/dynamicsolutions',
                github: 'https://github.com/dynamicsolutions'
            },
            description: 'Providing dynamic solutions for modern challenges.'
        },
        {
            _id: '61f8dce5e7a83129bcdb3f1d',
            companyName: 'Infinite Innovations',
            email: 'infiniteinnovations@example.com',
            password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq',
            website: 'https://infiniteinnovations.io',
            socialMedia: {
                facebook: 'https://facebook.com/infiniteinnovations',
                instagram: 'https://instagram.com/infiniteinnovations',
                linkedin: 'https://linkedin.com/company/infiniteinnovations',
                github: 'https://github.com/infiniteinnovations'
            },
            description: 'Infinite possibilities through innovative solutions.'
        },
        {
            _id: '61f8dce5e7a83129bcdb3f1e',
            companyName: 'GreenTech Hub',
            email: 'greentechhub@example.com',
            password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq',
            website: 'https://greentechhub.org',
            socialMedia: {
                facebook: 'https://facebook.com/greentechhub',
                instagram: 'https://instagram.com/greentechhub',
                linkedin: 'https://linkedin.com/company/greentechhub',
                github: 'https://github.com/greentechhub'
            },
            description: 'Promoting environmentally friendly technology solutions.'
        },
        {
            _id: '61f8dce5e7a83129bcdb3f1f',
            companyName: 'FutureScape Technologies',
            email: 'futurescapetech@example.com',
            password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq',
            website: 'https://futurescapetech.com',
            socialMedia: {
                facebook: 'https://facebook.com/futurescapetech',
                instagram: 'https://instagram.com/futurescapetech',
                linkedin: 'https://linkedin.com/company/futurescapetech',
                github: 'https://github.com/futurescapetech'
            },
            description: 'Navigating the future with cutting-edge technologies.'
        },
        {
            _id: '61f8dce5e7a83129bcdb3f20',
            companyName: 'CodeCraft Innovations',
            email: 'codecraft@example.com',
            password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq',
            website: 'https://codecraftinnovations.dev',
            socialMedia: {
                facebook: 'https://facebook.com/codecraftinnovations',
                instagram: 'https://instagram.com/codecraftinnovations',
                linkedin: 'https://linkedin.com/company/codecraftinnovations',
                github: 'https://github.com/codecraftinnovations'
            },
            description: 'Crafting innovative solutions through code.'
        },
    ]);
}

export default companySeeder;