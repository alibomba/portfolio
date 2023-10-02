import categorySeeder from "./categorySeeder";
import productSeeder from "./productSeeder";
import userSeeder from "./userSeeder";
import imageSeeder from "./imageSeeder";
import parameterSeeder from "./parameterSeeder";
import variantSeeder from "./variantSeeder";
import discountSeeder from "./discountSeeder";
import orderSeeder from "./orderSeeder";
import couponCodeSeeder from "./couponCodeSeeder";
import reviewSeeder from "./reviewSeeder";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function truncate() {
    await prisma.user.deleteMany();
    await prisma.shipping.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.product.deleteMany();
    await prisma.variant.deleteMany();
    await prisma.discount.deleteMany();
    await prisma.parameter.deleteMany();
    await prisma.image.deleteMany();
    await prisma.review.deleteMany();
    await prisma.productLike.deleteMany();
    await prisma.category.deleteMany();
    await prisma.contactMessage.deleteMany();
    await prisma.orderReport.deleteMany();
    await prisma.order.deleteMany();
    await prisma.orderGroup.deleteMany();
    await prisma.returnRequest.deleteMany();
    await prisma.discountCoupon.deleteMany();
    await prisma.cartElement.deleteMany();
    await prisma.newsletterMember.deleteMany();
    await prisma.reviewReport.deleteMany();
    await prisma.reviewLike.deleteMany();
    await prisma.reviewDislike.deleteMany();
}

async function main() {
    await truncate();
    await userSeeder();
    await categorySeeder();
    await productSeeder(300);
    await imageSeeder();
    await parameterSeeder();
    await variantSeeder();
    await discountSeeder();
    await orderSeeder();
    await couponCodeSeeder();
    await reviewSeeder();
}

main();