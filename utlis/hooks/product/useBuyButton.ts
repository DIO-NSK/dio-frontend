import {MouseEventHandler, useState} from "react";
import {useUnit} from "effector-react";
import {removeProductFromCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {addToCartEvent} from "@/components/organisms/cards/product-price-card/model";

export const useBuyButton = (inCart : boolean, productId: number) => {

    const [addToCart, removeFromCart]
        = useUnit([addToCartEvent, removeProductFromCartEvent])

    const [isSelected, setSelected] = useState<boolean>(inCart)

    const onClick: MouseEventHandler = (event) => {
        event.stopPropagation()
        if (isSelected) removeFromCart(productId)
        else addToCart(productId)
        setSelected(!isSelected)
    }

    return [isSelected, onClick] as const

}