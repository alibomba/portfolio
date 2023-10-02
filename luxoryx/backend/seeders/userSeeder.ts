import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function userSeeder() {
    const user = await prisma.user.create({
        data: {
            username: 'Wojtek',
            email: 'wojtek@gmail.com',
            phone_number: '123123123',
            password: '$2b$10$Zaj0rjpFl6p3laOgvkIdnuEGyBK0HsM7KH7qN2iXui17yLi7z8iMi'
        }
    });
    await prisma.shipping.create({
        data: {
            city: '',
            address: '',
            user_id: user.id
        }
    });

    const user2 = await prisma.user.create({
        data: {
            username: 'AliGamer',
            email: 'ali.gamer@op.pl',
            phone_number: '123 123 123',
            password: '$2b$10$Zaj0rjpFl6p3laOgvkIdnuEGyBK0HsM7KH7qN2iXui17yLi7z8iMi'
        }
    });
    await prisma.shipping.create({
        data: {
            city: '',
            address: '',
            user_id: user2.id
        }
    });

}

export default userSeeder;