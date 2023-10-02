import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function getRandomElementFromArray(array: any[]) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

async function parameterSeeder(){
    const materials = ['Żółte złoto', 'Srebro', 'Białe złoto', 'Różowe złoto', 'Szmaragd', 'Szafir', 'Diament'];

    const products = await prisma.product.findMany();
    products.forEach(async (product) => {
        await prisma.parameter.create({
            data: {
                key: 'Materiał',
                value: getRandomElementFromArray(materials),
                product_id: product.id
            }
        })
    });
}

export default parameterSeeder;