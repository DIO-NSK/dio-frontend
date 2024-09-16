import {ClassValue} from "clsx";
import {useLike} from "@/utlis/hooks/product/useLike";
import {useUnit} from "effector-react";
import {removeProductFromCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import {FiTrash2} from "react-icons/fi";
import {cn} from "@/utlis/cn";
import Counter from "@/components/moleculas/counter/Counter";
import Text from "@/components/atoms/text/text-base/Text";
import React from "react";
import {CounterRowProps} from "@/components/organisms/cards/shopping-cart-product-card/CounterRow/CounterRow.types";

const trashCV: ClassValue = "hoverable pointer text-info-red hover:text-red-700"

export const CounterRow = ({canInteract, card, amount, onIncrease, onDecrease}: CounterRowProps) => {
    const [isLiked, toggleLike] = useLike(card.inFavourites, card.productId)
    const removeProductFromCart = useUnit(removeProductFromCartEvent)

    const handleDeleteProduct = () => removeProductFromCart({productId: card.productId})

    if (canInteract) {
        return (
            <div className={'w-full flex items-center md:flex-row-reverse md:gap-5 xl:flex-row xl:gap-7'}>
                <div className={"flex flex-row items-center gap-5"}>
                    <LikeButton isLiked={isLiked} toggleLike={toggleLike}/>
                    <FiTrash2 size={"22px"} className={cn(trashCV)} onClick={handleDeleteProduct}/>
                </div>
                <Counter amount={amount} increase={onIncrease} decrease={onDecrease}/>
            </div>
        )
    }

    return (
        <Text
            className={"text-lg text-text-gray"}
            text={`${card.quantity} шт.`}
        />
    )
}