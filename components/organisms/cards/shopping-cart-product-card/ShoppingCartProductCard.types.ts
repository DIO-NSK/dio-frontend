import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";

export type ShoppingCartProductCardProps = {
    card: ResponseCartItem,
    hasLink?: boolean,
    canInteract?: boolean,
    className ?: string
}