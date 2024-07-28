import React from 'react';
import {SelectItem} from "@/types/props/SelectItem";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import {FiCheck} from "react-icons/fi";
import {ClassValue} from "clsx";

type SelectItemProps<T> = {
    item: SelectItem<T>,
    isSelected : boolean,
    onSelect: (item: SelectItem<T>) => void,
}

const SelectInputItem = <T,>(props: SelectItemProps<T>) => {

    const textCV : ClassValue = {
        "text-black" : props.isSelected,
        "text-text-gray" : !props.isSelected
    }

    const itemCV: ClassValue[] = [
        "w-full p-[20px] flex flex-row items-center",
        "justify-between pointer hoverable hover:bg-bg-light-blue"
    ]

    const handleSelectItem = () => props.onSelect(props.item)

    return (
        <div className={cn(itemCV)} onClick={handleSelectItem}>
            <Text text={props.item.name} className={cn(textCV)}/>
            {
                props.isSelected && <FiCheck
                    className={"stroke-[3px] stroke-link-blue"}
                    size={"18px"}
                />
            }
        </div>
    )

}

export default SelectInputItem;
