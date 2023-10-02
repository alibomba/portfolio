function computeSummaryPriceCart(cart: UICartElement[]): string {
    let sum = 0;
    cart.forEach((cartElement) => {
        sum += (cartElement.price * cartElement.quantity);
    });
    return `${sum.toFixed(2)}zł`;
}

export default computeSummaryPriceCart;