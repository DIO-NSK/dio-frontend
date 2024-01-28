import {SelectedItem} from "@/types/select";
import React, {useState} from "react";
import Text from "@/components/atoms/text/text-base/Text";
import {COLOR} from "@/components/colors";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {FiCheck} from "react-icons/fi";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

type DropdownInputProps = {
    items: SelectedItem[],
    onSelect: (selectedItem: SelectedItem) => void
    selectedItem: SelectedItem,
    label?: string,
    className?: string,
    width?: string,
}

type DropdownItemType = {
    item: SelectedItem,
    selectedItem: SelectedItem,
    onSelect: (item: SelectedItem) => void,
}

const DropdownItem = ({item, selectedItem, onSelect}: DropdownItemType) => {

    const color = selectedItem === item ? COLOR["black"] : COLOR["text-gray"]
    const itemCV = "w-full p-[20px] flex flex-row items-center justify-between pointer hoverable hover:bg-bg-light-blue"

    return (
        <div
            className={itemCV}
            onClick={() => onSelect(item)}
        >
            <Text text={item.text} color={color}/>
            {
                selectedItem === item && <FiCheck
                    size={"18px"}
                    className={"stroke-[3px] stroke-link-blue"}
                />
            }
        </div>
    )
}

const DropdownInput = ({width = "w-full", ...props}: DropdownInputProps) => {

    const [isExpanded, setExpanded] = useState(false)
    const className = `flex flex-col gap-[10px] ${width}`

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

    return (
        <div className={className}>

            {
                props.label && <Text text={props.label}/>
            }

            <div className={"relative w-full"}>

                <div className={cn(inputCV)}>
                    <Text text={props.selectedItem.text}/>
                    <ChevronButton
                        isExpanded={isExpanded}
                        setExpanded={(isExpanded) => setExpanded(isExpanded)}
                    />
                </div>

                {
                    isExpanded && <div className={cn(itemListCV)}>
                        {
                            props.items.map((item, index) => {
                                return <DropdownInput.DropdownItem
                                    key={index}
                                    item={item}
                                    selectedItem={props.selectedItem}
                                    onSelect={(selectedItem: SelectedItem) => props.onSelect(selectedItem)}
                                />
                            })
                        }
                    </div>
                }

            </div>

        </div>
    )
}

DropdownInput.DropdownItem = DropdownItem

export default DropdownInput
