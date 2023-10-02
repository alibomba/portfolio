import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomElementFromArray(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

async function discountSeeder() {
    const productIds = await prisma.product.findMany({ select: { id: true } });


    await prisma.discount.createMany({
        data: [
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id },
            { percentage: Math.round(Math.random() * (85 - 20 + 1)) + 20, expires_at: "2023-10-10T10:00:00.000Z", product_id: getRandomElementFromArray(productIds).id }
        ]
    })

}

export default discountSeeder;