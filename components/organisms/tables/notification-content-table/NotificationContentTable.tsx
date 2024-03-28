import React from 'react';
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {TableRow, TableWrapperProps} from "@/types/dto/Table";
import {Notification} from "@/types/dto/Notification";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Checkbox from "@/components/atoms/buttons/checkbox/Checkbox";
import Text from "@/components/atoms/text/text-base/Text";
import {useRouter} from "next/navigation";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";

type NotificationContentTableProps = {
    tableContent: TableRow<Notification>[],
    selectedItems: Notification[],
    onSelect: (notification: Notification) => void
} & Omit<TableWrapperProps, "children">

type NotificationRowProps = {
    tableRow: TableRow<Notification>,
    onSelect: (notification: Notification) => void
    isSelected: boolean,
}

const NotificationRow = (props: NotificationRowProps) => {

    const router = useRouter()

    const wrapperCV: ClassValue[] = [
        "w-full flex flex-row items-center justify-between py-7",
        "border-b-2 border-light-gray hoverable pointer px-7",
        {"hover:bg-bg-light-blue": props.tableRow.item.type !== "critical"},
        {"pl-[65px] bg-red-50": props.tableRow.item.type === "critical"},
        {"bg-bg-light-blue": props.isSelected}
    ]

    const textCV: ClassValue = {
        "text-info-red": props.tableRow.item.type !== "info",
        "text-info-blue": props.tableRow.item.type === "info"
    }

    const buttonCV: ClassValue = {
        "text-info-red hover:text-red-800": props.tableRow.item.type !== "info",
        "text-link-blue hover:text-blue-800": props.tableRow.item.type === "info"
    }

    const handleButtonClick = () => router.push(props.tableRow.item.textLink.link)
    const handleSelectItem = () => {
        if (props.tableRow.item.type !== "critical") {
            props.onSelect(props.tableRow.item)
        }
    }

    return (
        <div className={cn(wrapperCV)} onClick={handleSelectItem}>
            <div className={"w-fit flex flex-row items-center gap-5"}>
                {
                    props.tableRow.item.type !== "critical" && <Checkbox
                        isSelected={props.isSelected}
                    />
                }
                <div className={"flex flex-col gap-1"}>
                    <Text
                        text={props.tableRow.item.header}
                        className={cn("text-lg", textCV)}
                    />
                    {
                        props.tableRow.item.message && <Text
                            text={props.tableRow.item.message}
                            className={"text-text-gray"}
                        />
                    }
                </div>
            </div>
            <TextButton
                className={cn("hoverable pointer", buttonCV)}
                text={props.tableRow.item.textLink.text}
                onClick={handleButtonClick}
            />
        </div>
    )

}

const NotificationContentTable = (props: NotificationContentTableProps) => {

    return (
        <TableWrapper {...props}>
            {
                props.tableContent.map((tableRow, rowKey) => {

                    const isSelected = false

                    return <NotificationRow
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

export default NotificationContentTable;
