import React from 'react';
import {TableRow} from "@/types/dto/Table";
import {AdminOrder} from "@/types/dto/AdminOrder";
import Text from "@/components/atoms/text/text-base/Text";
import {convertStatusToText} from "@/utlis/convertStatusToText";

type TableOrderRowProps = {
    tableRow: TableRow<AdminOrder>,
    onClick : (tableRow : TableRow<AdminOrder>) => void,
    rightContent : React.ReactNode
}

const TableOrderRow = (props : TableOrderRowProps) => {

    const order = props.tableRow.item
    const handleRowClick = () => props.onClick(props.tableRow)

    return (
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
            {props.rightContent}
        </div>
    );

};

export default TableOrderRow;
