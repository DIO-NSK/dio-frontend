import { $orderToRepeat } from "@/app/(customer)/profile/orders/model";
import { useDiscount } from "@/utlis/hooks/product/useDiscount";
import { useUnit } from "effector-react";
import { $cart } from "../../(bottom-related-products)/cart/model";

export const useOrderPrice = () => {
    const orderToRepeat = useUnit($orderToRepeat)
    const cart = useUnit($cart);

    const totalOrderToRepeatOldPrice = orderToRepeat?.items?.reduce((acc, item) => {
        const [oldPrice] = useDiscount(item.price, item.discountPercent);

        return acc + oldPrice * item.quantity
    }, 0) ?? 0;

    const totalProductsOldPrice = cart?.products.reduce((acc, item) => {
        const [oldPrice] = useDiscount(item.price, item.discountPercent);

        return acc + oldPrice * item.quantity
    }, 0) ?? 0;

    const totalOrderToRepeatActualPrice = orderToRepeat?.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const totalProductsActualPrice = cart?.products.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0;
    const totalPromotionsActualPrice = cart?.promos.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0;

    const totalActualPrice = totalOrderToRepeatActualPrice ?? (totalProductsActualPrice + totalPromotionsActualPrice);
    const totalDiscount = orderToRepeat ? ((totalOrderToRepeatOldPrice ?? 0) - (totalOrderToRepeatActualPrice ?? 0)) : totalProductsOldPrice - totalProductsActualPrice

    const totalCartLength = orderToRepeat?.items.length ?? (cart?.products.length ?? 0) + (cart?.promos.length ?? 0);

    return {totalActualPrice, totalDiscount, totalCartLength};

}