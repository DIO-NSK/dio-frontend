import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

export interface PriceProps extends Pick<ResponseCartItem, 'price' | 'discountPercent'> {
    newPrice: number;
    amount: number;
}