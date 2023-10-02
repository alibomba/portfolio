interface OrderWithProduct extends Order{
    product: {
        name: string;
        images: [Image]
    }
}