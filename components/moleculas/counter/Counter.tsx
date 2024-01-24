import React from 'react';
import {FiMinus, FiPlus} from "react-icons/fi";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

type CounterProps = {
    onChange : (newValue : number) => void,
    value : number,
    maxValue ?: number
}

const Counter = (props : CounterProps) => {

    const controlCV : ClassValue = "text-border-gray hoverable pointer hover:text-link-blue"
    const minusCV : ClassValue[] = [controlCV, {"hover:text-text-gray" : props.value <= 0}]
    const plusCV : ClassValue[] = [controlCV, {"hover:text-text-gray" : props.value == props.maxValue}]

    const handleDecrement = () => props.value > 0 && props.onChange(props.value - 1)

    const handleIncrement = () => {
        props.maxValue !== undefined && props.value < props.maxValue
        && props.onChange(props.value + 1)
    }

    return (
        <div className={"flex flex-row items-center gap-5"}>
            <FiMinus size={"22px"} className={cn(minusCV)} onClick={handleDecrement}/>
            <Text text={String(props.value)} className={"text-lg text-text-gray"}/>
            <FiPlus size={"22px"} className={cn(plusCV)} onClick={handleIncrement}/>
        </div>
    );

};

export default Counter;
