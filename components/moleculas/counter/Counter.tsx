import React from 'react';
import {FiMinus, FiPlus} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {useCounter} from "@/utlis/hooks/product/useCounter";

type CounterProps = {
    amount: number,
    increase: () => void,
    decrease: () => void
}

const Counter = (props: CounterProps) => {

    const controlCV: ClassValue = "text-border-gray hoverable pointer hover:text-link-blue"
    const minusCV: ClassValue[] = [controlCV, {"hover:text-text-gray": props.amount == 1}]
    const plusCV: ClassValue[] = [controlCV, {"hover:text-text-gray": props.amount == 100}]

    return (
        <div className={"flex flex-row items-center gap-5"}>
            <FiMinus size={"22px"} className={cn(minusCV)} onClick={props.decrease}/>
            <Text text={`${props.amount}`} className={"text-lg text-text-gray"}/>
            <FiPlus size={"22px"} className={cn(plusCV)} onClick={props.increase}/>
        </div>
    );

};

export default Counter;
