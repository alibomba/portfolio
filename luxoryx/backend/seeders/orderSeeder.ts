import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomElementFromArray(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

async function orderSeeder(){
    const products = await prisma.product.findMany({select: {id: true}});
    const users = await prisma.user.findMany({select: {id: true}});

    // await prisma.order.createMany({
        
    // })
}

export default orderSeeder;