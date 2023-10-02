type ReturnData = {
    id: string,
    orderGroup_id: string,
    user_id: string,
    product_id: string,
    sold_at_price: number,
    quantity: number,
    bought_at: string,
    paid: boolean,
    product: {
        name: string,
        category: {
            name: string
        },
        images: [Image]
    }
}