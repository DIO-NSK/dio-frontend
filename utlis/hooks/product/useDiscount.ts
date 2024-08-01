export const useDiscount = (price: number, discountPercent: number | undefined) => {
    if (!discountPercent || discountPercent === 0) {
        return [price, price];
    }

    const oldPrice = price / (1 - 0.01 * discountPercent)
    return [oldPrice, price] as const
}