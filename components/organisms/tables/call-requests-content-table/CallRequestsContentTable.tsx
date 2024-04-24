import React, {useState} from 'react';
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {CallRequestTableRow, TableWrapperProps} from "@/types/dto/Table";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Checkbox from "@/components/atoms/buttons/checkbox/Checkbox";
import dayjs from "dayjs";
import {ResponseCallRequest} from "@/types/dto/admin/call-request/ResponseCallRequest";
import {convertPhoneNumber} from "@/utlis/convertPhoneNumber";

type CallRequestsContentTable = {
    tableContent: CallRequestTableRow[],
    selectedItems: number[],
    onSelect: (id: number) => void
} & Omit<TableWrapperProps, "children">

const CallRequestRow = ({tableRow, isSelected, onSelect}: {
    tableRow: CallRequestTableRow,
    onSelect: (id: number) => void
    isSelected: boolean,
}) => {

    const MAX_TEXT_LENGTH = 100

    const wrapperCV: ClassValue[] = [
        "relative w-full grid grid-cols-8 gap-x-7 py-7 border-b-2 border-light-gray",
        "hoverable hover:bg-bg-light-blue -mx-7 px-7 relative pointer",
        {"bg-bg-light-blue": isSelected}
    ]

    const date = dayjs(tableRow.item.createAt).format("DD.MM.YYYY")
    const time = dayjs(tableRow.item.createAt).format("HH:mm:ss")
    const dots = tableRow.item.comment.length > MAX_TEXT_LENGTH ? "..." : ""
    const phoneNumber = convertPhoneNumber(tableRow.item.numberPhone)

    const [isExpanded, setExpanded] = useState<boolean>(false)
    const handleSwitchExpanded = () => setExpanded(!isExpanded)
    const handleSelectRequest = () => onSelect(tableRow.item.id)

    return (
        <div className={cn(wrapperCV)} onClick={handleSelectRequest}>
            <div className={"col-span-2 flex flex-row gap-5"}>
                <Checkbox isSelected={isSelected}/>
                <div className={"w-full flex flex-col gap-1"}>
                    <Text text={tableRow.item.fullName}/>
                    <Text text={phoneNumber} className={"text-text-gray"}/>
                </div>
            </div>
            <div className={"col-span-1 flex flex-col gap-1"}>
                <Text text={date} className={"text-text-gray"}/>
                <Text text={time} className={"text-text-gray"}/>
            </div>
            <div className={"col-span-5 flex flex-col gap-1"}>
                <Text text={
                    isExpanded ? tableRow.item.comment
                        : tableRow.item.comment.slice(0, MAX_TEXT_LENGTH) + dots}
                />
                {tableRow.item.comment.length > MAX_TEXT_LENGTH && <TextButton
                    onClick={handleSwitchExpanded}
                    text={isExpanded ? "Скрыть" : "Развернуть"}
                />}
            </div>
        </div>
    )

}

const CallRequestsContentTable = (props: CallRequestsContentTable) => {

    const computeIsSelectedItem = (callRequest: ResponseCallRequest) => {
        const findCallRequest = props.selectedItems.find((cr) => cr === callRequest.id)
        return !!findCallRequest
    }

    return (
        <TableWrapper {...props}>
            {props.tableContent.map((tableRow, rowKey) => {

                const isSelected = computeIsSelectedItem(tableRow.item)

                return <CallRequestRow
                    onSelect={props.onSelect}
                    isSelected={isSelected}
                    tableRow={tableRow}
                    key={rowKey}
                />

            })}
        </TableWrapper>
    );

};

export default CallRequestsContentTable;
