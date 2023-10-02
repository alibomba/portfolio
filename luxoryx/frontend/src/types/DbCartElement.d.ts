type DbCartElement = {
    id: string,
    user_id: string,
    product_id: string,
    quantity: number,
    added_at: string,
    product: Omit<ProductTile, "discount">
}