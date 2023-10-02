import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function imageSeeder() {
    const products = await prisma.product.findMany();

    products.forEach(async (product) => {
        await prisma.image.create({
            data: {
                url: '1.jpg',
                is_thumbnail: true,
                product_id: product.id
            }
        });

        await prisma.image.create({
            data: {
                url: '2.jpg',
                is_thumbnail: false,
                product_id: product.id
            }
        });

        await prisma.image.create({
            data: {
                url: '3.jpg',
                is_thumbnail: false,
                product_id: product.id
            }
        });

        await prisma.image.create({
            data: {
                url: '4.jpg',
                is_thumbnail: false,
                product_id: product.id
            }
        });

        await prisma.image.create({
            data: {
                url: '5.jpg',
                is_thumbnail: false,
                product_id: product.id
            }
        });

        await prisma.image.create({
            data: {
                url: '6.jpg',
                is_thumbnail: false,
                product_id: product.id
            }
        });
    });
}


export default imageSeeder;