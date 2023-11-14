import style from "./CheckboxItem.module.css"
import {FiCheck} from "react-icons/fi";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {SelectedItem} from "@/types/select";
import {COLOR} from "@/components/colors";

type CheckboxItemProps = {
    item : SelectedItem,
    onSelect: () => void
}

const CheckboxItem = ({item, onSelect}: CheckboxItemProps) => {

    const selected = item.isSelected ? "selected" : "unselected"
    const textColor = item.isSelected ? COLOR["black"] : COLOR["text-gray"]

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
            <TextBase text={item.text} color={textColor}/>
        </div>
    )

}

export default CheckboxItem
