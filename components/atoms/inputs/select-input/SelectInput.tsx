import {SelectItem} from "@/types/props/SelectItem";
import React, {useState} from "react";
import Text from "@/components/atoms/text/text-base/Text";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import SelectInputItem from "@/components/atoms/inputs/select-input/select-input-item/SelectInputItem";

type DropdownInputProps<T> = {
    items: SelectItem<T>[],
    onSelect: (selectedItem: SelectItem<T>) => void
    selectedItem: SelectItem<T>,
    label?: string,
    className?: string,
    width?: string,
}

const SelectInput = <T,>({width = "w-full", ...props}: DropdownInputProps<T>) => {

    const [isExpanded, setExpanded] = useState(false)

    const inputCV: ClassValue[] = [
        "w-full p-[20px] flex flex-row items-center",
        "justify-between rounded-xl bg-bg-light-blue",
        "border-2 border-light-gray",
        props.className
    ]

    const itemListCV: ClassValue[] = [
        "absolute w-full z-10 top-[80px] rounded-xl bg-white",
        "drop-shadow-lg flex flex-col overflow-clip"
    ]

    const handleSelectItem = (selectedItem: SelectItem<T>) => props.onSelect(selectedItem)

    return (
        <div className={`flex flex-col gap-[10px] ${width}`}>

            {props.label && <Text text={props.label}/>}

            <div className={"relative w-full"}>

                <div className={cn(inputCV)}>
                    <Text text={props.selectedItem.name}/>
                    <ChevronButton
                        isExpanded={isExpanded}
                        setExpanded={setExpanded}
                    />
                </div>

                {
                    isExpanded && <div className={cn(itemListCV)}>
                        {
                            props.items.map((item, index) => {
                                return <SelectInputItem
                                    key={index} item={item}
                                    isSelected={props.selectedItem === item}
                                    onSelect={handleSelectItem}
                                />
                            })
                        }
                    </div>
                }

            </div>

        </div>
    )
}

export default SelectInput
