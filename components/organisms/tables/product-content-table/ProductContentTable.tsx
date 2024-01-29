import React from 'react';
import {ProductTableRow, TableWrapperProps} from "@/types/dto/Table";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMenu} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {AdminProduct} from "@/types/dto/AdminProduct";

type ProductContentTableProps = {
    tableContent: ProductTableRow[],
    isDraggable?: boolean,
    onProductClick : (product : AdminProduct) => void,
} & Omit<TableWrapperProps, "children">

const ProductRow = ({onClick, isDraggable, product}: {
    onClick : (product : AdminProduct) => void,
    isDraggable?: boolean,
    product: AdminProduct
}) => {

    const wrapperCV: ClassValue[] = [
        "relative w-full grid grid-cols-8 items-center gap-x-7 py-7 border-b-2 border-light-gray",
        "hoverable group hover:bg-bg-light-blue px-7 relative pointer",
        {"pl-20": isDraggable}
    ]

    const handleProductClick = () => onClick(product)

    return (
        <div className={cn(wrapperCV)} onClick={handleProductClick}>
            {
                isDraggable && <SquareIcon
                    className={"absolute left-0 top-1/3"}
                    icon={<FiMenu size={"18px"}/>}
                />
            }
            <div className={"col-span-5 flex flex-row items-center gap-5"}>
                <img
                    src={product.image}
                    alt={"Изображение товара"}
                    className={"w-[70px] h-[70px] object-scale-down rounded-xl"}
                />
                <Text text={product.name} className={"font-medium"}/>
            </div>

            <Text text={`${product.discount}%`} className={"col-span-1"}/>
            <Text text={`${product.stockAmount} шт.`} className={"col-span-1"}/>
            <Text text={`${product.price} ₽`} className={"col-span-1"}/>

        </div>
    )

}

const ProductContentTable = (props: ProductContentTableProps) => {
    return (
        <TableWrapper {...props}>
            {
                props.tableContent.map((tableRow, rowKey) =>
                    <ProductRow
                        onClick={props.onProductClick}
                        isDraggable={props.isDraggable}
                        product={tableRow.product}
                        key={rowKey}
                    />
                )
            }
        </TableWrapper>
    );
};

export default ProductContentTable;
