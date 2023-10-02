interface UICartElement extends Omit<ProductTile, "discount"> {
    quantity: number
}