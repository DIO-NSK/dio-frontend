import React from 'react';
import {ProductTableRow, TableWrapperProps} from "@/types/dto/Table";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu, FiMoreHorizontal} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {AdminSale} from "@/types/dto/AdminSale";
import EditDeleteTooltip from "@/components/organisms/tooltips/EditDeleteTooltip";

type ProductContentTableProps<T> = {
    tableContent: ProductTableRow<T>[],
    isDraggable?: boolean,
    onProductClick: (tableRow: ProductTableRow<T>) => void,
    onEdit : (tableRow : ProductTableRow<T>) => void,
    onDelete : (tableRow : ProductTableRow<T>) => void,
} & Omit<TableWrapperProps, "children">

const ProductRow = <T extends AdminSale, >({onClick, isDraggable, tableRow, ...props}: {
    onClick: (product: ProductTableRow<T>) => void,
    onEdit : (tableRow : ProductTableRow<T>) => void,
    onDelete : (tableRow : ProductTableRow<T>) => void,
    isDraggable?: boolean,
    tableRow: ProductTableRow<T>
}) => {

    const wrapperCV: ClassValue[] = [
        "relative w-full grid grid-cols-8 items-center gap-x-7 py-7 border-b-2 border-light-gray",
        "hoverable group hover:bg-bg-light-blue px-7 relative pointer",
        {"pl-20": isDraggable}
    ]

    const handleProductClick = () => onClick(tableRow)

    return (
        <div className={cn(wrapperCV)} onClick={handleProductClick}>
            {
                isDraggable && <SquareIcon
                    className={"absolute left-0 top-1/3"}
                    icon={<FiMenu size={"18px"}/>}
                />
            }
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

const ProductContentTable = <T extends AdminSale, >(props: ProductContentTableProps<T>) => {
    return (
        <TableWrapper {...props}>
            {
                props.tableContent.map((tableRow, rowKey) =>
                    <ProductRow
                        onClick={props.onProductClick}
                        tableRow={tableRow} key={rowKey}
                        {...props}
                    />
                )
            }
        </TableWrapper>
    );
};

export default ProductContentTable;
