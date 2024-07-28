import style from "./CheckboxItem.module.css"
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import {CheckboxListItem} from "@/types/props/CheckboxItem";
import Checkbox from "@/components/atoms/buttons/checkbox/Checkbox";

type CheckboxItemProps = {
    item: CheckboxListItem,
    onSelect: () => void
}

const CheckboxItem = ({item, onSelect}: CheckboxItemProps) => {

    const selected = item.isSelected ? "selected" : "unselected"
    const textCV: ClassValue = {"text-text-gray": !item.isSelected}

    return (
        <div className={style.row}>
            <Checkbox
                isSelected={item.isSelected ?? false}
                onSelect={onSelect}
            />
            <Text
                text={item.name}
                className={cn(textCV)}
            />
        </div>
    )

}

export default CheckboxItem
