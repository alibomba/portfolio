import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function variantSeeder(){
    const products = await prisma.product.findMany();

    products.forEach(async (product) => {
        await prisma.variant.createMany({
            data: [
                {name: 'Duży', product_id: product.id},
                {name: 'Średni', product_id: product.id},
                {name: 'Mały', product_id: product.id}
            ]
        });
    });
}

export default variantSeeder;