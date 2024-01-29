import CheckboxItem from "@/components/atoms/selectors/checkbox-item/CheckboxItem";
import {SelectItem} from "@/types/props/Select";

type CheckboxListProps = {
    selectedItems: SelectItem[],
    onSelect: (isSelected: boolean, index: number) => void,
}

const CheckboxList = (props: CheckboxListProps) => {
    return (
        <div className={"w-full flex flex-col gap-[15px]"}>
            {
                props.selectedItems.map((item, index) => {
                    return <CheckboxItem
                        item={item}
                        onSelect={() => props.onSelect(!item.isSelected, index)}
                    />
                })
            }
        </div>
    )
}

export default CheckboxList
