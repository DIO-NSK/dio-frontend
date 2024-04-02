import React from 'react';
import {TableRow, TableWrapperProps} from "@/types/dto/Table";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import TableOrderRow from "@/components/organisms/rows/table-order-row/TableOrderRow";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";

type AnalyticContentTable = {
    tableContent: TableRow<AdminOrder>[],
    onClick: (tableRow: TableRow<AdminOrder>) => void
} & Omit<TableWrapperProps, "children">

type OrderRowProps = {
    tableRow: TableRow<AdminOrder>,
    onClick: (tableRow: TableRow<AdminOrder>) => void,
}

const AnalyticRow = (props: OrderRowProps) => {

    const order = props.tableRow.item

    const mainWrapperCV: ClassValue[] = [
        "pointer hoverable w-full flex flex-row items-start gap-5",
        "py-7 border-b-2 border-light-gray hover:bg-bg-light-blue px-7"
    ]

    return (
        <div className={cn(mainWrapperCV)}>
            <TableOrderRow
                {...props}
                isSelected={false}
                rightContent={
                    <React.Fragment>
                        <Text text={"—"} className={"col-span-1"}/>
                        <Text text={`${order.products.length} шт.`} className={"col-span-1"}/>
                    </React.Fragment>
                }
            />
        </div>
    )

}

const AnalyticContentTable = (props: AnalyticContentTable) => {
    return (
        <TableWrapper {...props}>
            {props.tableContent.map((tableRow, rowKey) => {

                return <AnalyticRow
                    onClick={props.onClick}
                    tableRow={tableRow}
                    key={rowKey}
                />

            })}
        </TableWrapper>
    );
};

export default AnalyticContentTable;
