import { PrismaClient } from '@prisma/client';
import rng from './rng';
import randomFutureDate from './randomFutureDate';

const prisma = new PrismaClient();

async function reservationSeeder(howMany: number) {
    for (let i = 0; i <= howMany; i++) {
        await prisma.reservation.create({
            data: {
                service: 'Lorem ipsum',
                price: rng(1000, 25000),
                date: randomFutureDate(300)
            }
        });
    }
}

export default reservationSeeder;