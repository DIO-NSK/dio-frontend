import React, {useState} from 'react';
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

type ShoppingCartProductCardProps = {
    card: ResponseCartItem,
    canInteract?: boolean
}

const HeaderRow = ({card, canInteract = true}: ShoppingCartProductCardProps) => {

    const removeProductFromCart = useUnit(removeProductFromCartEvent)

    const [amount, setAmount] = useState<number>(1)

    const discountPrice = 0.01 * card.discountPercent * card.price
    const newPrice = discountPrice === 0 ? card.price : card.price - discountPrice

    const trashCV: ClassValue = "hoverable pointer text-info-red hover:text-red-700"

    const handleDeleteProduct = () => removeProductFromCart(card.name)

    return (
        <div className={"hidden w-full sm:flex flex-row items-center justify-between"}>
            <Text text={card.name} className={"max-w-[400px] text-base font-medium"}/>
            <div className={"flex flex-row items-center gap-7"}>
                {
                    canInteract ? <React.Fragment>
                        <div className={"flex flex-row items-center gap-5"}>
                            <LikeButton/>
                            <FiTrash2
                                size={"22px"}
                                className={cn(trashCV)}
                                onClick={handleDeleteProduct}
                            />
                        </div>
                        <Counter
                            onChange={setAmount}
                            value={amount}
                            maxValue={5}
                        />
                    </React.Fragment> : <Text
                        text={"2 шт."}
                        className={"text-lg text-text-gray"}
                    />
                }
                <div className={"flex flex-row items-baseline gap-2"}>
                    <Text
                        className={"text-[22px] font-medium"}
                        text={`${newPrice.toFixed(2)} ₽`}
                    />
                    {
                        discountPrice !== 0 && <Text
                            text={`${card.price.toFixed(2)} ₽`}
                            className={"text-text-gray line-through"}
                        />
                    }
                </div>

            </div>
        </div>
    )
}

const MobileHeaderRow = (props: ShoppingCartProductCardProps) => {

    const discountPrice = 0.01 * props.card.discountPercent * props.card.price
    const newPrice = discountPrice === 0 ? props.card.price : props.card.price - discountPrice

    return (
        <section className={"sm:hidden flex flex-col gap-1"}>
            <div className={"flex flex-row items-baseline gap-2"}>
                <Text
                    text={`${newPrice.toFixed(2)} ₽`}
                    className={"text-lg text-link-blue font-semibold"}
                />
                {
                    discountPrice !== 0 && <Text
                        text={`${props.card.price.toFixed(2)} ₽`}
                        className={"text-text-gray line-through"}
                    />
                }
            </div>
            <Text text={props.card.name}/>
        </section>
    )

}

const ShoppingCartProductCard = (props: ShoppingCartProductCardProps) => {

    const imageCV: ClassValue[] = [
        "w-[76px] h-[60px] rounded-lg object-cover",
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
