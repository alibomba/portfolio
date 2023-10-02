type Product = {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    category_id: string,
    createdAt: string,
    images: Image[],
    category: Category,
    variants: {
        id: string,
        name: string,
        product_id: string
    }[],
    discount: Discount | null,
    parameters: {
        id: string,
        key: string,
        value: string,
        product_id: string
    }[]
}