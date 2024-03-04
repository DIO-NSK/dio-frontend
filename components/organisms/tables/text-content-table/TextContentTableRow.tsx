import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu, FiMoreHorizontal} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {TableWrapperProps, TextTableRow} from "@/types/dto/Table";
import EditDeleteTooltip from "../../tooltips/EditDeleteTooltip";

type TextContentTableProps = {
    tableRow: TextTableRow;
    isDraggable?: boolean;
    onRowClick?: (rowIndex: number) => void;
} & Omit<TableWrapperProps, "children">;

const TextContentTableRow = ({tableRow, ...props}: TextContentTableProps) => {

    const itemCV: ClassValue = [
        "w-full grid grid-cols-8 gap-7 py-7 border-b-2 border-light-gray",
        "hoverable group hover:bg-bg-light-blue px-7 relative pointer",
        {"pl-20": props.isDraggable},
    ]

    return (
        <div className={cn(itemCV)} onClick={() => props.onRowClick?.(tableRow.id)}>
            {props.isDraggable && (
                <div
                    className={
                        "absolute cursor-grab active:cursor-grabbing top-1/3 left-7"
                    }
                >
                    <SquareIcon icon={<FiMenu size={"18px"}/>}/>
                </div>
            )}
            {tableRow.item?.map((rowItem, itemKey) => (
                <Text
                    className={tableRow.itemsWidth[itemKey]}
                    key={itemKey}
                    text={rowItem}
                />
            ))}
            {props.isDraggable && (
                <EditDeleteTooltip tableRow={tableRow} {...props}>
                    <SquareIcon icon={<FiMoreHorizontal size={"18px"}/>}/>
                </EditDeleteTooltip>
            )}
        </div>
    );
};

export default TextContentTableRow;
