type ProductTile = {
    id: string,
    name: string,
    price: number,
    stock: number,
    discount: Discount | null,
    images: [Image]
}