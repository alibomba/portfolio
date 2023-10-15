import { PrismaClient } from "@prisma/client";
import adviceSeeder from "./advideSeeder";
import fundraisingSeeder from "./fundraisingSeeder";
import newsSeeder from "./newsSeeder";
import projectSeeder from "./projectSeeder";

const prisma = new PrismaClient();

async function truncate() {
    await prisma.advice.deleteMany();
    await prisma.contactMessage.deleteMany();
    await prisma.fundraising.deleteMany();
    await prisma.news.deleteMany();
    await prisma.newsletterMember.deleteMany();
    await prisma.project.deleteMany();
}

async function main() {
    await truncate();
    await adviceSeeder();
    await fundraisingSeeder();
    await newsSeeder(50);
    await projectSeeder(50);
}

main();