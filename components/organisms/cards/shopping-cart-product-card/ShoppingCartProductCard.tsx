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
import Chip from "@/components/atoms/chip/Chip";
import Link from "next/link";

type ShoppingCartProductCardProps = {
    card: ResponseCartItem,
    canInteract?: boolean
}

const HeaderRow = ({card, canInteract = true}: ShoppingCartProductCardProps) => {

    const removeProductFromCart = useUnit(removeProductFromCartEvent)

    const [isLiked, toggleLike] = useLike(card.inFavourites, card.productId)
    const [amount, increase, decrease] = useCounter(card.productId, card.quantity)

    const [newPrice, price] = useDiscount(card.price, card.discountPercent)

    const trashCV: ClassValue = "hoverable pointer text-info-red hover:text-red-700"

    const handleDeleteProduct = () => removeProductFromCart({productId : card.productId})

    return (
        <div className={"hidden w-full sm:flex flex-row items-center justify-between"}>
            <div className={"flex flex-col gap-2"}>
                {!card.inStock && <Chip className={"bg-gray-100"}>
                    <Text text={"Нет в наличии"} className={"text-xs uppercase text-text-gray"}/>
                </Chip>}
                <Text text={card.name} className={"max-w-[400px] text-base font-medium"}/>
            </div>
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
                <div className={"flex flex-col items-end"}>
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

const MobileHeaderRow = ({canInteract = true, ...props}: ShoppingCartProductCardProps) => {

    const removeProductFromCart = useUnit(removeProductFromCartEvent)

    const [isLiked, toggleLike] = useLike(props.card.inFavourites, props.card.productId)
    const [amount, increase, decrease] = useCounter(props.card.productId, props.card.quantity)

    const [newPrice, price] = useDiscount(props.card.price, props.card.discountPercent)

    const handleDeleteProduct = () => removeProductFromCart({productId : props.card.productId})

    return (
        <section className={"sm:hidden flex flex-col gap-2"}>
            {!props.card.inStock && <Chip className={"bg-gray-100"}>
                <Text text={"Нет в наличии"} className={"text-xs uppercase text-text-gray"}/>
            </Chip>}
            <Text text={props.card.name}/>
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
            {
                canInteract ? <div className={"flex flex-row items-center gap-7"}>
                    <Counter amount={amount} increase={increase} decrease={decrease}/>
                    <FiTrash2 size={"18px"} className={"text-info-red"} onClick={handleDeleteProduct}/>
                </div> : <Text
                    className={"text-base sm:text-lg text-text-gray"}
                    text={`${props.card.quantity} шт.`}
                />
            }
        </section>
    )

}

const ShoppingCartProductCard = (props: ShoppingCartProductCardProps) => {

    const imageCV: ClassValue[] = [
        "w-[90px] aspect-square rounded-lg object-scale-down",
        "sm:w-[150px] sm:h-[90px] sm:rounded-xl"
    ]

    return (
        <div className={"w-full flex flex-row gap-4 sm:gap-5"}>
            <Link href={`/product/${props.card.productId}`} target={'_blank'} rel={'noopener noferrer'}>
                <img src={props.card.mainImage as string} alt={"/"} className={cn(imageCV)}/>
            </Link>
            <div className={"w-full flex flex-col"}>
                <HeaderRow {...props}/>
                <MobileHeaderRow {...props}/>
            </div>
        </div>
    );

};

export default ShoppingCartProductCard;
