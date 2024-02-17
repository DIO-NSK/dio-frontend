import React from 'react';
import {useToggle} from "@/utlis/hooks/useToggle";
import {ClassValue} from "clsx";
import {FiCheck, FiPlus} from "react-icons/fi";
import {cn} from "@/utlis/cn";

const BuyButton = () => {

    const buyToggle = useToggle()

    const wrapperCV: ClassValue[] = [
        "sm:hidden w-10 h-10 rounded-full flex items-center justify-center transition duration-200",
        {"bg-bg-light-blue text-link-blue": !buyToggle.state},
        {"bg-link-blue text-white": buyToggle.state}
    ]

    return (
        <button
            className={cn(wrapperCV)}
            onClick={() => buyToggle.toggleState()}
        >
            {
                !buyToggle.state
                    ? <FiPlus size={"18px"}/>
                    : <FiCheck size={"18px"}/>
            }
        </button>
    );

};

export default BuyButton;
