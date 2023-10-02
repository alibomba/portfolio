import { Product } from "@prisma/client";

export default interface Favorite {
    product: Product;
}