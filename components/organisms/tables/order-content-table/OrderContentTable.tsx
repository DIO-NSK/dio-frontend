import React, {SyntheticEvent, useState} from 'react';
import {TableRow, TableWrapperProps} from "@/types/dto/Table";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {computeIsSelectedItem} from "@/utlis/computeIsSelectedItem";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import Text from "@/components/atoms/text/text-base/Text";
import {convertStatusToText} from "@/utlis/convertStatusToText";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {ShoppingCartProductCardDTO} from "@/types/dto/cards/ProductCard";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Checkbox from "@/components/atoms/buttons/checkbox/Checkbox";
import {FiMoreHorizontal} from "react-icons/fi";
import OrderTooltip from "@/components/organisms/tooltips/OrderTooltip";

type OrderContentTableProps = {
    tableContent: TableRow<AdminOrder>[],
    selectedItems: AdminOrder[],
    onSelect: (order: AdminOrder) => void,
    onClick : (tableRow : TableRow<AdminOrder>) => void
} & Omit<TableWrapperProps, "children">

type OrderRowProps = {
    tableRow: TableRow<AdminOrder>,
    onSelect: (order: AdminOrder) => void,
    onClick : (tableRow : TableRow<AdminOrder>) => void,
    isSelected: boolean,
}

const OrderRowProductCard = ({product}: { product: ShoppingCartProductCardDTO }) => {
    return (
        <div className={"w-full flex flex-col gap-2 pb-3 border-b-2 border-light-gray"}>
            <div className={"w-full flex flex-row items-center gap-3"}>
                <Text text={`ID ${product.productCode}`} className={"text-[14px] text-text-gray"}/>
                <div className={"w-[5px] h-[5px] rounded-full bg-border-gray"}/>
                <Text text={`${product.amount} шт.`} className={"text-[14px] text-text-gray"}/>
            </div>
            <Text text={product.header}/>
            <Text text={`${product.price} ₽`} className={"text-link-blue"}/>
        </div>
    )
}

const OrderRow = (props: OrderRowProps) => {

    const order = props.tableRow.item
    const [isExpanded, setExpanded] = useState<boolean>(false)

    const mainWrapperCV : ClassValue[] = [
        "pointer hoverable w-full flex flex-row items-start gap-5",
        "py-7 border-b-2 border-light-gray hover:bg-bg-light-blue px-7",
        {"bg-bg-light-blue": props.isSelected}
    ]

    const handleRowClick = () => props.onClick(props.tableRow)
    const handleSwitchExpanded = (e : SyntheticEvent) => {
        e.stopPropagation()
        setExpanded(!isExpanded)
    }
    const handleSelect = () => props.onSelect(order)

    return (
        <div className={cn(mainWrapperCV)}>

            <div className={"flex flex-row gap-3 items-center"}>
                <Checkbox isSelected={props.isSelected} onSelect={handleSelect}/>
                <OrderTooltip tableItem={props.tableRow}>
                    <FiMoreHorizontal className={"hoverable pointer text-text-gray hover:text-link-blue"} />
                </OrderTooltip>
            </div>

            <div className={"w-full grid grid-cols-8 gap-7"} onClick={handleRowClick}>
                <div className={"col-span-1 flex flex-col gap-1"}>
                    <Text text={order.creationDate!!}/>
                    <Text text={order.creationTime!!}/>
                </div>
                <Text text={order.deliveryDate} className={"col-span-1"}/>
                <Text text={`ID ${order.orderId}`} className={"col-span-1"}/>
                <Text text={convertStatusToText(order.status)} className={"col-span-1"}/>
                <Text text={order.customer.name} className={"col-span-1"}/>
                <Text text={`${order.totalPrice} ₽`} className={"col-span-1"}/>
                <div className={"col-span-2 flex flex-col gap-3"}>
                    {
                        order.products.map((product, key) =>
                            (isExpanded || key == 0) && <OrderRowProductCard product={product} key={key}/>
                        )
                    }
                    <TextButton
                        text={isExpanded ? "Свернуть" : "Показать ещё"}
                        onClick={handleSwitchExpanded}
                    />
                </div>
            </div>

        </div>
    )

}

const OrderContentTable = (props: OrderContentTableProps) => {
    return (
        <TableWrapper {...props}>
            {
                props.tableContent.map((tableRow, rowKey) => {

                    const isSelected = computeIsSelectedItem(props.selectedItems, tableRow.item)

                    return <OrderRow
                        onClick={props.onClick}
                        onSelect={props.onSelect}
                        isSelected={isSelected}
                        tableRow={tableRow}
                        key={rowKey}
                    />

                })
            }
        </TableWrapper>
    );
};

export default OrderContentTable;
