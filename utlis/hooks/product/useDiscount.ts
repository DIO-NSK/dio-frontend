export const useDiscount = (price: number, discountPercent: number) => {
    const discountPrice = price - price * 0.01 * discountPercent
    const newPrice = discountPercent === 0 ? price : discountPrice
    return [newPrice, price] as const
}