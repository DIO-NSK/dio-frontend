import React, {MouseEventHandler} from 'react';
import {ClassValue} from "clsx";
import {FiCheck, FiPlus} from "react-icons/fi";
import {cn} from "@/utlis/cn";

type BuyButtonProps = {
    isInCart : boolean,
    onClick : MouseEventHandler,
    className ?: string
}

const BuyButton = ({isInCart, onClick, className} : BuyButtonProps) => {

    const wrapperCV: ClassValue[] = [
        "sm:hidden w-10 h-10 rounded-full flex items-center justify-center transition duration-200",
        {"bg-bg-light-blue text-link-blue": !isInCart},
        {"bg-link-blue text-white": isInCart},
        className
    ]

    return (
        <button className={cn(wrapperCV)} onClick={onClick}>
            {!isInCart ? <FiPlus size={"18px"}/> : <FiCheck size={"18px"}/>}
        </button>
    );

};

export default BuyButton;
