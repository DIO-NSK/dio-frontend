import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu, FiMoreHorizontal} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {TableWrapperProps, TextTableRow} from "@/types/dto/Table";
import EditDeleteTooltip from "../../tooltips/EditDeleteTooltip";
import {SortableHandlerProps} from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";

type TextContentTableProps = {
    tableRow: TextTableRow,
    isDraggable?: boolean,
    onRowClick?: (rowIndex: number) => void,
    hasTooltip?: boolean
} & Omit<TableWrapperProps, "children"> & SortableHandlerProps;

const TextContentTableRow = ({tableRow, hasTooltip = false, ...props}: TextContentTableProps) => {

    const itemCV: ClassValue = [
        "w-full grid grid-cols-8 gap-7 py-7 border-b-2 border-light-gray items-center",
        "hoverable group hover:bg-bg-light-blue px-7 relative pointer",
        {"pl-20": props.isDraggable},
    ]

    const draggableCN = "absolute cursor-grab active:cursor-grabbing top-1/3 left-7"

    return (
        <div className={cn(itemCV)} onClick={() => props.onRowClick?.(tableRow.id)}>
            {props.isDraggable && (
                <div
                    ref={props.setActivatorNodeRef}
                    className={cn(draggableCN)}
                    {...props.attributes}
                    {...props.listeners}
                >
                    <SquareIcon icon={<FiMenu size={"18px"}/>}/>
                </div>
            )}
            <div className={cn(tableRow.itemsWidth[0], 'flex flex-row items-center gap-5')}>
                {tableRow?.image && <img
                    className={'col-span-1 h-[50px] rounded-lg object-cover'}
                    alt={'Изображение категории'}
                    src={tableRow.image}
                />}
                <Text text={tableRow.item[0]}/>
            </div>
            {tableRow.item?.slice(1).map((rowItem, itemKey) => (
                <Text
                    className={tableRow.itemsWidth[itemKey]}
                    key={itemKey} text={rowItem}
                />
            ))}
            {(props.isDraggable || hasTooltip) && (
                <EditDeleteTooltip tableRow={tableRow} {...props}>
                    <SquareIcon icon={<FiMoreHorizontal size={"18px"}/>}/>
                </EditDeleteTooltip>
            )}
        </div>
    );
};

export default TextContentTableRow;
