import style from "./DropdownInput.module.css"
import {SelectedItem} from "@/types/select";
import React, {useState} from "react";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {COLOR} from "@/components/colors";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import {FiCheck} from "react-icons/fi";

type DropdownInputProps = {
    items: SelectedItem[],
    onSelect: (selectedItem: SelectedItem) => void
    selectedItem: SelectedItem
}

type DropdownItemType = {
    item: SelectedItem,
    selectedItem : SelectedItem,
    onSelect: (item: SelectedItem) => void,
}

const DropdownItem = ({item, selectedItem, onSelect}: DropdownItemType) => {

    const color = selectedItem === item ? COLOR["black"] : COLOR["text-gray"]

    return (
        <div
            className={style.item}
            onClick={() => onSelect(item)}
        >
            <TextBase text={item.text} color={color}/>
            {
                selectedItem === item && <FiCheck
                    size={"18px"}
                    className={"stroke-[3px] stroke-link-blue"}
                />
            }
        </div>
    )
}

const DropdownInput = (props: DropdownInputProps) => {

    const [isExpanded, setExpanded] = useState(false)

    return (
        <div className={style.wrapper}>

            <div className={style.input}>
                <TextBase text={props.selectedItem.text}/>
                <ChevronButton
                    isExpanded={isExpanded}
                    setExpanded={(isExpanded) => setExpanded(isExpanded)}
                />
            </div>

            {
                isExpanded && <div className={style.itemList}>
                    {
                        props.items.map((item, index) => {
                            return <DropdownInput.DropdownItem
                                item={item}
                                selectedItem={props.selectedItem}
                                onSelect={(selectedItem: SelectedItem) => props.onSelect(selectedItem)}
                            />
                        })
                    }
                </div>
            }

        </div>
    )
}

DropdownInput.DropdownItem = DropdownItem

export default DropdownInput
