import {SelectItem} from "@/types/props/SelectItem";
import React, {LegacyRef} from "react";
import Text from "@/components/atoms/text/text-base/Text";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import SelectInputItem from "@/components/atoms/inputs/select-input/select-input-item/SelectInputItem";
import {useClickOutside} from "@/utlis/hooks/useClickOutside";

type DropdownInputProps<T> = {
    items: SelectItem<T>[],
    onSelect: (selectedItem: SelectItem<T>) => void,
    size?: "sm" | "md",
    selectedItem: SelectItem<T>,
    labelText?: string,
    className?: string,
    placeholder?: string,
    width?: string,
    error?: string
}

const SelectInput = <T, >({width = "w-full", size = "md", ...props}: DropdownInputProps<T>) => {

    const clickOutsideMethods = useClickOutside(false)

    const inputCV: ClassValue[] = [
        "w-full sm:p-[20px] px-5 py-4 flex flex-row items-center",
        "justify-between rounded-xl bg-bg-light-blue",
        "border-2 border-light-gray pointer",
        {"sm:px-4 sm:py-3": size === "sm"},
        props.className
    ]

    const itemListCV: ClassValue[] = [
        "absolute w-full z-10 top-[80px] rounded-xl bg-white",
        "drop-shadow-lg flex flex-col overflow-clip"
    ]

    const textCV = {"text-text-gray": !props.selectedItem || props.selectedItem?.name?.length === 0}
    const inputText = (!props.selectedItem || props.selectedItem?.name?.length === 0)
        ? props.placeholder : props.selectedItem.name

    const handleSelectItem = (selectedItem: SelectItem<T>) => {
        props.onSelect?.(selectedItem)
        clickOutsideMethods.setIsComponentVisible(false)
    }

    const handleOnClick = () => {
        clickOutsideMethods.setIsComponentVisible(!clickOutsideMethods.isComponentVisible)
    }

    return (
        <div className={`flex flex-col gap-[10px] ${width}`}>

            {props.labelText && <Text text={props.labelText}/>}

            <div className={"relative w-full"} ref={clickOutsideMethods.ref as LegacyRef<HTMLDivElement>}>

                <div className={cn(inputCV)} onClick={handleOnClick}>
                    <Text text={inputText!!} className={cn(textCV)}/>
                    <ChevronButton
                        isExpanded={clickOutsideMethods.isComponentVisible}
                        setExpanded={clickOutsideMethods.setIsComponentVisible}
                    />
                </div>

                {props.error && <Text
                    text={props.error}
                    className={"text-info-red"}
                />}

                {clickOutsideMethods.isComponentVisible && <div className={cn(itemListCV)}>
                    {
                        props.items.map((item, index) => {
                            return <SelectInputItem
                                key={index} item={item}
                                isSelected={props.selectedItem === item}
                                onSelect={handleSelectItem}
                            />
                        })
                    }
                </div>}

            </div>

        </div>
    )
}

export default SelectInput
