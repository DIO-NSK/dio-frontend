import React, {useState} from 'react';
import {ShoppingCartProductCardDTO} from "@/types/dto/cards/ProductCard";
import Text from "@/components/atoms/text/text-base/Text";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import {FiTrash2} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Counter from "@/components/moleculas/counter/Counter";

type ShoppingCartProductCardProps = {
    card: ShoppingCartProductCardDTO,
    canInteract?: boolean
}

const HeaderRow = ({card, ...props}: ShoppingCartProductCardProps) => {

    const [amount, setAmount] = useState<number>(card.amount)

    const productPrice = card.price == 0 ? "Бесплатно" : `${card.price} ₽`
    const trashCV: ClassValue = "hoverable pointer text-info-red hover:text-red-700"

    return (
        <div className={"hidden w-full sm:flex flex-row items-center justify-between"}>
            <Text text={card.header} className={"text-lg font-medium"}/>
            <div className={"flex flex-row items-center gap-7"}>
                {
                    props.canInteract ? <>
                        <div className={"flex flex-row items-center gap-5"}>
                            <LikeButton/>
                            <FiTrash2 size={"22px"} className={cn(trashCV)}/>
                        </div>
                        <Counter
                            onChange={setAmount}
                            value={amount}
                            maxValue={5}
                        />
                    </> : <Text text={"2 шт."} className={"text-lg text-text-gray"}/>
                }
                <Text text={productPrice} className={"text-[24px] font-medium"}/>
            </div>
        </div>
    )
}

const MobileHeaderRow = (props: ShoppingCartProductCardProps) => {
    return (
        <section className={"sm:hidden flex flex-col gap-1"}>
            <div className={"flex flex-row items-baseline gap-2"}>
                <Text text={`${props.card.price} ₽`} className={"text-lg text-link-blue font-semibold"}/>
                {
                    props.card.oldPrice && <Text
                        text={`${props.card.oldPrice} ₽`}
                        className={"text-text-gray"}
                    />
                }
            </div>
            <Text text={props.card.header}/>
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
            <img src={props.card.image as string} alt={"/"} className={cn(imageCV)}/>
            <div className={"w-full flex flex-col"}>
                <HeaderRow {...props}/>
                <MobileHeaderRow {...props}/>
                <Text
                    text={`Код товара ${props.card.productCode}`}
                    className={"hidden sm:flex text-base text-text-gray"}
                />
            </div>
        </div>
    );

};

export default ShoppingCartProductCard;
