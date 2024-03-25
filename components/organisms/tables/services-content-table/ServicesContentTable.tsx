import React, {useState} from 'react';
import {ServiceTableRow, TableWrapperProps} from "@/types/dto/Table";
import {ClassValue} from "clsx";
import dayjs from "dayjs";
import {convertPhoneNumber} from "@/utlis/convertPhoneNumber";
import {cn} from "@/utlis/cn";
import Checkbox from "@/components/atoms/buttons/checkbox/Checkbox";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {AdminService} from "@/types/dto/admin/service/AdminService";

type ServicesContentTable = {
    tableContent: ServiceTableRow[],
    selectedItems: number[],
    onSelect: (id: number) => void
} & Omit<TableWrapperProps, "children">

const ServiceRow = ({tableRow, isSelected, onSelect}: {
    tableRow: ServiceTableRow,
    onSelect: (id: number) => void
    isSelected: boolean,
}) => {

    const MAX_TEXT_LENGTH = 100

    const wrapperCV: ClassValue[] = [
        "relative w-full grid grid-cols-8 gap-x-7 py-7 border-b-2 border-light-gray",
        "hoverable hover:bg-bg-light-blue px-7 relative pointer",
        {"bg-bg-light-blue": isSelected}
    ]

    const date = dayjs(tableRow.item.createAt).format("DD.MM.YYYY")
    const time = dayjs(tableRow.item.createAt).format("HH:mm:ss")
    const dots = tableRow.item.message ? (tableRow.item.message.length > MAX_TEXT_LENGTH ? "..." : "") : "—"
    const phoneNumber = convertPhoneNumber(tableRow.item.numberPhone)

    const [isExpanded, setExpanded] = useState<boolean>(false)
    const handleSwitchExpanded = () => setExpanded(!isExpanded)
    const handleSelectRequest = () => onSelect(tableRow.item.id)

    return (
        <div className={cn(wrapperCV)} onClick={handleSelectRequest}>
            <div className={"col-span-2 flex flex-row gap-5"}>
                <Checkbox isSelected={isSelected}/>
                <div className={"w-full flex flex-col gap-1"}>
                    <Text text={tableRow.item.name ?? "—"}/>
                    <Text text={phoneNumber} className={"text-text-gray"}/>
                </div>
            </div>
            <div className={"col-span-1 flex flex-col gap-1"}>
                <Text text={date} className={"text-text-gray"}/>
                <Text text={time} className={"text-text-gray"}/>
            </div>
            <Text text={tableRow.item.nameServiceType}/>
            <div className={"col-span-4 flex flex-col gap-1"}>
                {
                    tableRow.item.message ? <React.Fragment>
                        <Text text={
                            isExpanded ? tableRow.item.message
                                : tableRow.item.message.slice(0, MAX_TEXT_LENGTH) + dots
                        }
                        />
                        {tableRow.item.message.length > MAX_TEXT_LENGTH && <TextButton
                            onClick={handleSwitchExpanded}
                            text={isExpanded ? "Скрыть" : "Развернуть"}
                        />}
                    </React.Fragment> : <Text
                        className={"text-text-gray"}
                        text={"—"}
                    />
                }
            </div>
        </div>
    )

}

const ServicesContentTable = (props: ServicesContentTable) => {

    const computeIsSelectedItem = (service: AdminService) => {
        const findCallRequest = props.selectedItems.find((s) => s === service.id)
        return !!findCallRequest
    }

    return (
        <TableWrapper {...props}>
            {
                props.tableContent.map((tableRow, rowKey) => {

                    const isSelected = computeIsSelectedItem(tableRow.item)

                    return <ServiceRow
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

export default ServicesContentTable;