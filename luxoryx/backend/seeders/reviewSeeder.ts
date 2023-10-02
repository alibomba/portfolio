import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function getRandomElementFromArray(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

async function reviewSeeder() {
    const users = await prisma.user.findMany();
    const products = await prisma.product.findMany();

    products.forEach(async (product) => {
        await prisma.review.createMany({
            data: [
                { user_id: getRandomElementFromArray(users).id, content: 'Lorem ipsum dolor sit amet', product_id: product.id, rate: (Math.random() * (5 - 1 + 1)) + 1 },
                { user_id: getRandomElementFromArray(users).id, content: 'Lorem ipsum dolor sit amet', product_id: product.id, rate: (Math.random() * (5 - 1 + 1)) + 1 },
                { user_id: getRandomElementFromArray(users).id, content: 'Lorem ipsum dolor sit amet', product_id: product.id, rate: (Math.random() * (5 - 1 + 1)) + 1 },
                { user_id: getRandomElementFromArray(users).id, content: 'Lorem ipsum dolor sit amet', product_id: product.id, rate: (Math.random() * (5 - 1 + 1)) + 1 },
                { user_id: getRandomElementFromArray(users).id, content: 'Lorem ipsum dolor sit amet', product_id: product.id, rate: (Math.random() * (5 - 1 + 1)) + 1 },
            ]
        })
    });
}

export default reviewSeeder;