import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function couponCodeSeeder() {
    await prisma.discountCoupon.createMany({
        data: [
            {code: 'alibomba123', percentage: 55},
            {code: 'supersecretcode', percentage: 90}
        ]
    });
}

export default couponCodeSeeder;