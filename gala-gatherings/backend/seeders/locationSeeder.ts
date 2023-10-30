import { PrismaClient } from '@prisma/client';
import rng from './rng';

const prisma = new PrismaClient();

async function locationSeeder(howMany: number) {

    for (let i = 0; i <= howMany; i++) {
        await prisma.location.create({
            data: { image: `${rng(1, 7)}.webp`, name: 'Lorem ipsum', standard: rng(1, 5) }
        })
    }
}

export default locationSeeder;