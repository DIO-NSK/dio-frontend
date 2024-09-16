import Link from "next/link";
import {cn} from "@/utlis/cn";
import React from "react";
import {ClassValue} from "clsx";
import { ShoppingCartProductCardProps } from "../ShoppingCartProductCard.types";

const imageCV: ClassValue[] = [
    "w-[90px] aspect-square rounded-lg object-scale-down",
    "sm:w-[150px] sm:h-[90px] sm:rounded-xl"
]

export const LinkedImage = ({card, hasLink}: ShoppingCartProductCardProps) => {

    if (hasLink) {
        return (
            <Link href={`/product/${card.productId}`} target={'_blank'} rel={'noopener noferrer'}>
                <img src={card.mainImage as string} alt={"/"} className={cn(imageCV)}/>
            </Link>
        )
    }

    return (
        <img src={card.mainImage as string} alt={"/"} className={cn(imageCV)}/>
    )
}