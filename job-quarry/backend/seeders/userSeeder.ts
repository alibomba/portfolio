import { User } from "../models";

async function userSeeder() {
    await User.create({
        _id: '65a6d145d2f2047fd74be82c',
        email: 'wojci.bro@gmail.com',
        name: 'Wojtek', surname: 'Brońka',
        age: 18,
        password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq',
        skills: ['J.Angielski', 'TypeScript', 'React.js', 'Node.js', 'Express.js', 'Laravel', 'PostgreSQL', 'MongoDB', 'Prisma'],
        socialMedia: {
            facebook: 'https://www.facebook.com/profile.php?id=100009134822444',
            github: 'https://github.com/alibomba'
        },
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        portfolio: 'https://github.com/alibomba/portfolio',
        profilePicture: 'wojtek.png',
        experience: [
            {
                title: 'Fullstack Developer',
                company: 'Magme Agency',
                startDate: '08-01-2023',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
            }
        ]
    });
    await User.create({ email: 'ali.gamer@op.pl', name: 'Ali', surname: 'Gamer', age: 18, password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq' });
    await User.create({
        _id: '65a6d145d2f2047fd74be785',
        email: 'adam@gmail.com',
        name: 'Adam',
        surname: 'Kowalski',
        age: 52,
        password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq'
    });
    await User.create({
        _id: '65a6d145d2f2047fd74be786',
        email: 'piotr@gmail.com',
        name: 'Piotr',
        surname: 'Adamczyk',
        age: 31,
        password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq'
    });
    await User.create({
        _id: '65a6d145d2f2047fd74be787',
        email: 'dawid@gmail.com',
        name: 'Dawid',
        surname: 'Nowak',
        age: 58,
        password: '$2b$10$a5xra9gFr6yHwrWmDIgNZ.70U3KNLeti9gRynCzi/8Qh2HT9faRWq'
    });
}

export default userSeeder;