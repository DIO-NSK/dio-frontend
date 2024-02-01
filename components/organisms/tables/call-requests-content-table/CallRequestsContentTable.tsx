import React, {useState} from 'react';
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {CallRequestTableRow, TableWrapperProps} from "@/types/dto/Table";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Checkbox from "@/components/atoms/buttons/checkbox/Checkbox";
import {CallRequest} from "@/types/dto/CallRequest";

type CallRequestsContentTable = {
    tableContent: CallRequestTableRow[],
    selectedItems: CallRequest[],
    onSelect: (callRequest: CallRequest) => void
} & Omit<TableWrapperProps, "children">

const CallRequestRow = ({tableRow, isSelected, onSelect}: {
    tableRow: CallRequestTableRow,
    onSelect: (callRequest: CallRequest) => void
    isSelected: boolean,
}) => {

    const wrapperCV: ClassValue[] = [
        "relative w-full grid grid-cols-8 gap-x-7 py-7 border-b-2 border-light-gray",
        "hoverable hover:bg-bg-light-blue px-7 relative pointer",
        {"bg-bg-light-blue": isSelected}
    ]

    const [isExpanded, setExpanded] = useState<boolean>(false)
    const handleSwitchExpanded = () => setExpanded(!isExpanded)
    const handleSelectRequest = () => onSelect(tableRow.item)

    return (
        <div className={cn(wrapperCV)} onClick={handleSelectRequest}>
            <div className={"col-span-2 flex flex-row gap-5"}>
                <Checkbox isSelected={isSelected}/>
                <div className={"w-full flex flex-col gap-2"}>
                    <Text text={tableRow.item.customer.name}/>
                    <Text text={tableRow.item.customer.phoneNumber} className={"text-text-gray"}/>
                </div>
            </div>
            <div className={"col-span-1 flex flex-col gap-2"}>
                <Text text={tableRow.item.date} className={"text-text-gray"}/>
                <Text text={tableRow.item.time} className={"text-text-gray"}/>
            </div>
            <div className={"col-span-5 flex flex-col gap-3"}>
                <Text text={tableRow.item.comment}/>
                <TextButton onClick={handleSwitchExpanded} text={"Смотреть всё"}/>
            </div>
        </div>
    )

}

const CallRequestsContentTable = (props: CallRequestsContentTable) => {

    const computeIsSelectedItem = (callRequest : CallRequest) => {
        const findCallRequest = props.selectedItems.find((cr) => cr === callRequest)
        return !!findCallRequest
    }

    return (
        <TableWrapper {...props}>
            {
                props.tableContent.map((tableRow, rowKey) => {

                    const isSelected = computeIsSelectedItem(tableRow.item)

                    return <CallRequestRow
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

export default CallRequestsContentTable;
