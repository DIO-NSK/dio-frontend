import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import {FiTrash2} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Counter from "@/components/moleculas/counter/Counter";
import {
    removeProductFromCartEvent,
    ResponseCartItem
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import {useUnit} from "effector-react";
import {useLike} from "@/utlis/hooks/product/useLike";
import {useCounter} from "@/utlis/hooks/product/useCounter";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";

type ShoppingCartProductCardProps = {
    card: ResponseCartItem,
    canInteract?: boolean
}

const HeaderRow = ({card, canInteract = true}: ShoppingCartProductCardProps) => {

    const removeProductFromCart = useUnit(removeProductFromCartEvent)

    const [isLiked, toggleLike] = useLike(true, card.productId)
    const [amount, increase, decrease] = useCounter(card.productId, card.quantity)

    const [newPrice, price] = useDiscount(card.price, card.discountPercent)

    const trashCV: ClassValue = "hoverable pointer text-info-red hover:text-red-700"

    const handleDeleteProduct = () => removeProductFromCart(card.productId)

    return (
        <div className={"hidden w-full sm:flex flex-row items-center justify-between"}>
            <Text text={card.name} className={"max-w-[400px] text-base font-medium"}/>
            <div className={"flex flex-row items-center gap-7"}>
                {
                    canInteract ? <React.Fragment>
                        <div className={"flex flex-row items-center gap-5"}>
                            <LikeButton isLiked={isLiked} toggleLike={toggleLike}/>
                            <FiTrash2 size={"22px"} className={cn(trashCV)} onClick={handleDeleteProduct}/>
                        </div>
                        <Counter amount={amount} increase={increase} decrease={decrease}/>
                    </React.Fragment> : <Text
                        className={"text-lg text-text-gray"}
                        text={`${card.quantity} шт.`}
                    />
                }
                <div className={"flex flex-row items-baseline gap-2"}>
                    <Text
                        className={"text-[22px] font-medium"}
                        text={`${(newPrice * amount).toFixed(2)} ₽`}
                    />
                    {card.discountPercent !== 0 && <Text
                        text={`${(price * amount).toFixed(2)} ₽`}
                        className={"text-text-gray line-through"}
                    />}
                </div>

            </div>
        </div>
    )
}

const MobileHeaderRow = (props: ShoppingCartProductCardProps) => {

    const [newPrice, price] = useDiscount(props.card.price, props.card.discountPercent)

    return (
        <section className={"sm:hidden flex flex-col gap-1"}>
            <div className={"flex flex-row items-baseline gap-2"}>
                <Text
                    text={`${newPrice.toFixed(2)} ₽`}
                    className={"text-lg text-link-blue font-semibold"}
                />
                {props.card.discountPercent !== 0 && <Text
                    text={`${price.toFixed(2)} ₽`}
                    className={"text-text-gray line-through"}
                />}
            </div>
            <Text text={props.card.name}/>
        </section>
    )

}

const ShoppingCartProductCard = (props: ShoppingCartProductCardProps) => {

    const imageCV: ClassValue[] = [
        "w-[76px] h-[60px] rounded-lg object-scale-down",
        "sm:w-[150px] sm:h-[90px] sm:rounded-xl"
    ]

    return (
        <div className={"w-full flex flex-row gap-3 sm:gap-5"}>
            <img src={props.card.mainImage as string} alt={"/"} className={cn(imageCV)}/>
            <div className={"w-full flex flex-col"}>
                <HeaderRow {...props}/>
                <MobileHeaderRow {...props}/>
            </div>
        </div>
    );

};

export default ShoppingCartProductCard;
