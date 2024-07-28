import {MouseEventHandler, useState} from "react";
import {useUnit} from "effector-react";
import {removeProductFromCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {addToCartEvent, RequestAddToCart} from "@/components/organisms/cards/product-price-card/model";
import {api, BASE_URL} from "@/api";

export const useBuyButton = (inCart: boolean, productId: number, isSale ?: boolean) => {

    const [addToCart, removeFromCart] = useUnit([addToCartEvent, removeProductFromCartEvent])

    const [isSelected, setSelected] = useState<boolean>(inCart)

    const onClick: MouseEventHandler = (event) => {
        event.stopPropagation()
        if (isSelected) {
            if (isSale) {
                removeFromCart({promoId: productId})
            } else {
                removeFromCart({productId: productId})
            }
        } else {
            if (isSale) {
                addToCart({promoId: productId, quantityPromo: 1})
            } else {
                addToCart({productId: productId, quantityProduct: 1})
            }
        }
        setSelected(!isSelected)
    }

    return [isSelected, onClick] as const

}