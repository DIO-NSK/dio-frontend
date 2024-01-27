import React from 'react';
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {TableHeaderItem, TextTableRow} from "@/types/dto/Table";
import Text from "@/components/atoms/text/text-base/Text";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import SquareIcon from "@/components/atoms/icons/square-icon/SquareIcon";
import {FiMoreHorizontal} from "react-icons/fi";

type TextContentTableProps = {
    tableHeader : TableHeaderItem[],
    tableContent : TextTableRow[]
}

const TextContentTable = (props : TextContentTableProps) => {

    const itemCV : ClassValue = [
        "col-span-full grid grid-cols-10 gap-7 py-7 border-b-2 border-light-gray",
        "hoverable group hover:bg-bg-light-blue mx-[-28px] px-7 relative"
    ]

    return (
        <TableWrapper tableHeader={props.tableHeader}>
            {
                props.tableContent.map((tableRow, rowKey) =>
                    <div key={rowKey} className={cn(itemCV)}>
                        {
                            tableRow.items.map((rowItem, itemKey) =>
                                <Text key={itemKey} text={rowItem} className={"col-span-2"}/>
                            )
                        }
                        <SquareIcon
                            className={"absolute pointer top-1/3 right-7"}
                            icon={<FiMoreHorizontal size={"18px"}/>}
                        />
                    </div>
                )
            }
        </TableWrapper>
    );

};

export default TextContentTable;
