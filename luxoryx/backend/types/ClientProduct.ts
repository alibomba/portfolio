import { Image } from "@prisma/client";

export default interface ClientProduct{
    id: string,
    name: string,
    price: number,
    stock: number,
    images: [Image],
    quantity: number
}