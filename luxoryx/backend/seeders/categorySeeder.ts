import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function categorySeeder() {
    await prisma.category.createMany({
        data: [
            { name: 'naszyjniki', image: 'necklace.png' },
            { name: 'kolczyki', image: 'earrings.png' },
            { name: 'bransolety', image: 'bracelet.png' },
            { name: 'broszki', image: 'broszka.png' },
            { name: 'pierścionki', image: 'ring.png' },
            { name: 'zegarki męskie', image: 'men-watch.png' },
            { name: 'zegarki damskie', image: 'women-watch.png' },
            { name: 'spinki', image: 'cufflinks.png' },
            { name: 'zawieszki', image: 'pendant.png' },
            { name: 'breloki', image: 'brelok.png' },
            { name: 'łańcuszki', image: 'neck-chain.png' },
            { name: 'dla dzieci', image: 'kid-jewelry.png' }
        ]
    });
}

export default categorySeeder;