import CheckboxItem from "@/components/atoms/selectors/checkbox-item/CheckboxItem";
import {CheckboxListItem} from "@/types/props/CheckboxItem";

type CheckboxListProps = {
    items: CheckboxListItem[],
    onSelect: (isSelected: boolean, index: number) => void,
}

const CheckboxList = (props: CheckboxListProps) => {
    return (
        <div className={"w-full flex flex-col gap-[15px]"}>
            {
                props.items.map((item, index) => {
                    return <CheckboxItem
                        onSelect={() => props.onSelect(!item.isSelected, index)}
                        item={item}
                    />
                })
            }
        </div>
    )
}

export default CheckboxList
