import React from 'react';
import {ProductTableRow, TableWrapperProps} from "@/types/dto/Table";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {AdminSale} from "@/types/dto/AdminSale";

type ProductContentTableProps<T> = {
    tableContent: ProductTableRow<T>[],
    isDraggable?: boolean,
    onProductClick: (product: T) => void,
} & Omit<TableWrapperProps, "children">

const ProductRow = <T extends AdminSale, >({onClick, isDraggable, tableRow}: {
    onClick: (product: T) => void,
    isDraggable?: boolean,
    tableRow: ProductTableRow<T>
}) => {

    const wrapperCV: ClassValue[] = [
        "relative w-full grid grid-cols-8 items-center gap-x-7 py-7 border-b-2 border-light-gray",
        "hoverable group hover:bg-bg-light-blue px-7 relative pointer",
        {"pl-20": isDraggable}
    ]

    const handleProductClick = () => onClick(tableRow.product)

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
                    src={tableRow.product.image}
                    alt={"Изображение товара"}
                    className={"w-[70px] h-[70px] object-scale-down rounded-xl"}
                />
                <Text text={tableRow.product.name} className={"font-medium"}/>
            </div>

            <Text text={`${tableRow.product.discount}%`} className={tableRow.itemsWidth["discount"]}/>
            <Text text={`${tableRow.product.stockAmount} шт.`} className={tableRow.itemsWidth["stockAmount"]}/>
            {
                tableRow.product.price && <Text
                    text={`${tableRow.product.price} ₽`}
                    className={tableRow.itemsWidth["price"]}
                />
            }
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
                        isDraggable={props.isDraggable}
                        tableRow={tableRow}
                        key={rowKey}
                    />
                )
            }
        </TableWrapper>
    );
};

export default ProductContentTable;
