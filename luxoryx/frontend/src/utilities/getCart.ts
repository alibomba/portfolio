function getCart(): LocalCartElement[] | null {
    const cart: LocalCartElement[] | null = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') as string) : null;
    if (cart && cart.length > 0) {
        return cart;
    }
    else {
        return null;
    }
}

export default getCart;