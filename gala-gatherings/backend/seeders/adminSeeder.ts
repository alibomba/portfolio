import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function adminSeeder() {
    await prisma.admin.create({
        data: {
            login: 'admin',
            password: '$2b$10$yBuuYd4WGRyqDZNYZEbVK.J9lOkxl5Dctp8knDW6qfUUt7dY1SW3.'
        }
    });
}

export default adminSeeder;