export const useDiscount = (price: number, discountPercent: number) => {
    const oldPrice = price / (1 - 0.01 * discountPercent)
    return [price, oldPrice] as const
}