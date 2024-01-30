import style from "./CheckboxItem.module.css"
import {FiCheck} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {CheckboxListItem} from "@/types/props/CheckboxItem";

type CheckboxItemProps = {
    item : CheckboxListItem,
    onSelect: () => void
}

const CheckboxItem = ({item, onSelect}: CheckboxItemProps) => {

    const selected = item.isSelected ? "selected" : "unselected"
    const textCV : ClassValue = {"text-text-gray" : !item.isSelected}

    return (
        <div className={style.row}>
            <div
                selected={selected}
                className={style.checkbox}
                onClick={onSelect}
            >
                {
                    item.isSelected && <FiCheck
                        size={"14px"}
                        className={"stroke-white stroke-[4px]"}
                    />
                }
            </div>
            <Text
                text={item.name}
                className={cn(textCV)}
            />
        </div>
    )

}

export default CheckboxItem
