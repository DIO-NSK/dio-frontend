import {MouseEventHandler, useState} from "react";
import {useUnit} from "effector-react";
import {
    $cart,
    removeProductFromCartEvent
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {addToCartEvent} from "@/components/organisms/cards/product-price-card/model";

export const useBuyButton = (productName: string, productId: number) => {

    const [cart, addToCart, removeFromCart]
        = useUnit([$cart, addToCartEvent, removeProductFromCartEvent])

    const isInCart = (): boolean => {
        console.log(cart)
        const inCart = cart?.responseCart.products
            .find(product => product.name === productName)
        return Boolean(inCart)
    }

    const [isSelected, setSelected] = useState<boolean>(isInCart)

    const onClick: MouseEventHandler = (event) => {
        event.stopPropagation()
        if (isSelected) removeFromCart(productId)
        else addToCart(productId)
        setSelected(!isSelected)
    }

    return [isSelected, onClick] as const

}