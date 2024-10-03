import React from 'react';
import {AdminOrderTableRow, TableRow, TableWrapperProps} from "@/types/dto/Table";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {computeIsSelectedItem} from "@/utlis/computeIsSelectedItem";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import Text from "@/components/atoms/text/text-base/Text";
import {AdminOrder} from "@/types/dto/AdminOrder";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Checkbox from "@/components/atoms/buttons/checkbox/Checkbox";
import {FiMoreHorizontal} from "react-icons/fi";
import OrderTooltip from "@/components/organisms/tooltips/OrderTooltip";
import {ResponseCartItem} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import dayjs from "dayjs";
import {useToggle} from "@/utlis/hooks/useToggle";
import {useDiscount} from "@/utlis/hooks/product/useDiscount";
import {statusColorMap} from "@/components/organisms/tables/order-content-table/OrderContentTable.data";

type OrderContentTableProps = {
    tableContent: AdminOrderTableRow[],
    onClick: (tableRow: AdminOrderTableRow) => void,
    maxItems?: number,
    onSelect?: (order: AdminOrder) => void,
    selectedItems?: AdminOrderTableRow[],
} & Omit<TableWrapperProps, "children">

type OrderRowProps = {
    tableRow: AdminOrderTableRow,
    onClick: (tableRow: TableRow<AdminOrder>) => void,
    onSelect?: (order: AdminOrder) => void,
    isSelected?: boolean,
}

const OrderRowProductCard = ({product, hasMore}: { product: ResponseCartItem, hasMore: boolean }) => {

    const wrapperStyles = [
        "w-full flex flex-col gap-2",
        {"pb-3 border-b-2 border-light-gray": hasMore}
    ]

    const [price, newPrice] = useDiscount(product.price, product.discountPercent)

    return (
        <div className={cn(wrapperStyles)}>
            <div className={"w-full flex flex-row items-center gap-3"}>
                <Text text={`ID ${product.productId}`} className={"text-[14px] text-text-gray"}/>
                <div className={"w-[5px] h-[5px] rounded-full bg-border-gray"}/>
                <Text text={`${product.quantity} шт.`} className={"text-[14px] text-text-gray"}/>
            </div>
            <Text text={product.name}/>
            <section className={"w-full flex flex-row items-baseline gap-2"}>
                <Text text={`${newPrice.toFixed(2)} ₽`} className={"text-link-blue"}/>
                {product.discountPercent !== 0 && <Text
                    className={"text-text-gray text-sm line-through"}
                    text={`${price.toFixed(2)} ₽`}
                />}
            </section>
        </div>
    )
}

const OrderRow = (props: OrderRowProps) => {

    const order = props.tableRow.item
    const orderOpened = useToggle()

    const handleSelect = () => props.onSelect?.(order)
    const handleRowClick = () => props.onClick(props.tableRow)

    const totalPrice = order.products?.reduce((acc, item) => {
        const [_, newPrice] = useDiscount(item.price, item.discountPercent);

        return acc + newPrice * item.quantity;
    }, 0)

    const wrapperCV: ClassValue[] = [
        "pointer relative hoverable w-full px-7 grid grid-cols-8 gap-x-7",
        "py-7 border-b-2 border-light-gray hover:bg-bg-light-blue",
        {"bg-bg-light-blue": props.isSelected}
    ]

    const orderStatus = (order as any)?.paymentStatus;
    const backgroundKey = statusColorMap?.[orderStatus as keyof typeof statusColorMap] ?? 'gray';

    return (
        <div className={cn(wrapperCV)} onClick={handleRowClick}>

            <div className={"col-span-1 flex flex-col gap-1"}>
                <Text text={dayjs(order.created).format("DD.MM.YYYY")} className={"text-[15px]"}/>
                <Text text={dayjs(order.created).format("HH:mm")} className={"text-[15px]"}/>
            </div>

            <Text text={dayjs(order.deliveryDate).format("DD.MM.YYYY")} className={"col-span-1 text-[15px]"}/>
            <div className={'col-span-1 flex flex-col gap-3'}>
                <Text text={(order as any)?.orderStatus ?? order.status} className={'text-[14px] border-b-2 border-gray-100 pb-3'}/>
                <Text text={order?.paymentStatus} className={'text-[14px]'}/>
            </div>
            <div className={`col-span-1 h-fit w-fit flex-shrink-0 px-3 py-1 rounded-[5px] bg-${backgroundKey}-100`}>
                <Text text={(order as any)?.paymentStatus} className={'text-[14px]'}/>
            </div>
            <Text text={(order as any)?.address ?? order.fullName} className={"col-span-1 text-[15px]"}/>
            <div className={'col-span-1 text-[15px] flex flex-col gap-3'}>
                <Text text={`${totalPrice.toFixed(2)} ₽`} className={'text-[14px] border-b-2 border-gray-200 pb-3'}/>
                <Text text={`Бонусами: ${(order as any)?.bonusUsed}`} className={'text-[14px]'}/>
            </div>

            <div className={"col-span-2 flex flex-col gap-3"}>
                {order.products?.map((product, key) =>
                    (orderOpened.state || key == 0) &&
                    <OrderRowProductCard
                        product={product}
                        hasMore={order.products?.length > 1}
                        key={key}
                    />
                )}
                {order.products?.length > 1 && <TextButton
                    text={orderOpened.state ? "Свернуть" : "Показать ещё"}
                    onClick={orderOpened.toggleState}
                />}
            </div>

        </div>
    )

}

const OrderContentTable = (props: OrderContentTableProps) => {
    return (
        <TableWrapper classNames={{header: "px-7"}} {...props}>
            {props.tableContent.map((tableRow, rowKey) => {

                const isSelected = props.selectedItems
                    ? computeIsSelectedItem(props.selectedItems, tableRow)
                    : undefined

                if (!props.maxItems || props.maxItems && rowKey < props.maxItems) {
                    return <OrderRow
                        onClick={props.onClick}
                        onSelect={props.onSelect}
                        isSelected={isSelected}
                        tableRow={tableRow}
                        key={rowKey}
                    />
                }

            })}
        </TableWrapper>
    );
};

export default OrderContentTable;
