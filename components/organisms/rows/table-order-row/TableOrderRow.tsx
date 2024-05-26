import React from 'react';
import {AdminOrderTableRow} from "@/types/dto/Table";
import Text from "@/components/atoms/text/text-base/Text";
import dayjs from "dayjs";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

type TableOrderRowProps = {
    tableRow: AdminOrderTableRow,
    onClick: (tableRow: AdminOrderTableRow) => void,
    isSelected : boolean,
    rightContent: React.ReactNode
}

const TableOrderRow = (props: TableOrderRowProps) => {

    const order = props.tableRow.item
    const handleRowClick = () => props.onClick(props.tableRow)

    const totalPrice = order.products.reduce((acc, item) =>
        acc + item.price * item.quantity * (1 - 0.01 * item.discountPercent), 0)

    const wrapperCV : ClassValue[] = [
        "pointer hoverable w-full -mx-7 px-[95px] grid grid-cols-8 gap-x-7",
        "py-7 border-b-2 border-light-gray hover:bg-bg-light-blue px-7",
        {"bg-bg-light-blue": props.isSelected}
    ]

    return (
        <div className={cn(wrapperCV)} onClick={handleRowClick}>
            <div className={"col-span-1 flex flex-col gap-1"}>
                <Text
                    text={dayjs(order.deliveryDate).format("DD.MM.YYYY")}
                    className={"text-[15px]"}
                />
                <Text
                    text={order.deliveryTime ?? ""}
                    className={"text-[15px]"}
                />
            </div>
            <Text
                text={order.deliveryDate}
                className={"col-span-1 text-[15px]"}
            />
            <Text
                text={`ID ${order.id}`}
                className={"col-span-1 text-[15px]"}
            />
            <Text
                text={(order as any).orderStatus ?? order.status}
                className={"col-span-1 text-[15px]"}
            />
            <Text
                text={order.fullName}
                className={"col-span-1 text-[15px]"}
            />
            <Text
                text={`${totalPrice} ₽`}
                className={"col-span-1 text-[15px]"}
            />
            {props.rightContent}
        </div>
    );

};

export default TableOrderRow;
