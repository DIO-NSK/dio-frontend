import React from 'react';
import {ProductTableRow} from "@/types/dto/Table";
import {ResponseAdminProductSearch} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import {SortableHandlerProps} from "@/components/wrappers/sortable-wrapper/SortableItemWrapper";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu, FiMoreHorizontal} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import EditDeleteTooltip from "@/components/organisms/tooltips/EditDeleteTooltip";

const ProductRow = ({onClick, isDraggable, tableRow, ...props}: {
    onClick: (product: ProductTableRow<ResponseAdminProductSearch>) => void,
    onEdit: (tableRow: ProductTableRow<ResponseAdminProductSearch>) => void,
    onDelete: (tableRow: ProductTableRow<ResponseAdminProductSearch>) => void,
    isDraggable?: boolean,
    tableRow: ProductTableRow<ResponseAdminProductSearch>
} & SortableHandlerProps) => {

    const wrapperCV: ClassValue[] = [
        "relative w-full grid grid-cols-8 items-center gap-x-7 py-7 border-b-2 border-light-gray",
        "hoverable group hover:bg-bg-light-blue -mx-7 px-7 relative pointer",
        {"pl-20": isDraggable}
    ]

    const draggableCN = "absolute cursor-grab active:cursor-grabbing top-1/3 left-7"

    const handleProductClick = () => onClick(tableRow)

    return (
        <div className={cn(wrapperCV)} onClick={handleProductClick}>
            {isDraggable && (
                <div
                    ref={props.setActivatorNodeRef}
                    className={cn(draggableCN)}
                    {...props.attributes}
                    {...props.listeners}
                >
                    <SquareIcon icon={<FiMenu size={"18px"}/>}/>
                </div>
            )}
            <div className={cn("flex flex-row items-center gap-5", tableRow.itemsWidth["image"])}>
                <img
                    src={tableRow.item.image}
                    alt={"Изображение товара"}
                    className={"w-[70px] h-[70px] object-scale-down rounded-xl"}
                />
                <Text text={tableRow.item.name} className={"font-medium"}/>
            </div>

            <Text text={`${tableRow.item.discount}%`} className={tableRow.itemsWidth["discount"]}/>
            <Text text={`${tableRow.item.stockAmount} шт.`} className={tableRow.itemsWidth["stockAmount"]}/>
            {
                tableRow.item.price && <Text
                    text={`${tableRow.item.price} ₽`}
                    className={tableRow.itemsWidth["price"]}
                />
            }
            {isDraggable && (
                <EditDeleteTooltip tableRow={tableRow} {...props}>
                    <SquareIcon icon={<FiMoreHorizontal size={"18px"}/>}/>
                </EditDeleteTooltip>
            )}
        </div>
    )

}

export default ProductRow;
