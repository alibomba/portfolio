import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function featuredOfferSeeder() {
    await prisma.featuredOffer.createMany({
        data: [
            { serviceId: '1cec86cb-8920-427c-8ffa-c71f7d4f81bc' },
            { serviceId: 'fbe66c9c-5d66-45cd-af25-d856a3630686' },
            { serviceId: 'be75c8cd-9b23-4657-aa40-a35fa6cc556d' }
        ]
    })
}

export default featuredOfferSeeder;