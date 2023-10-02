function getOriginalPriceBasedOnDiscount(price: number, discount: Discount): number {
    return (price * 100) / (100 - discount.percentage);
}

export default getOriginalPriceBasedOnDiscount;