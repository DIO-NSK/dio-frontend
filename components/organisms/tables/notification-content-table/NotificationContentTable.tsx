import React from 'react';
import TableWrapper from "@/components/wrappers/table-wrapper/TableWrapper";
import {TableRow, TableWrapperProps} from "@/types/dto/Table";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Checkbox from "@/components/atoms/buttons/checkbox/Checkbox";
import Text from "@/components/atoms/text/text-base/Text";
import {useRouter} from "next/navigation";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {$selectedNotifications, AdminNotification} from "@/app/admin/notifications/model";
import {useUnit} from "effector-react";

type NotificationContentTableProps = {
    tableContent: TableRow<AdminNotification>[],
    selectedItems: TableRow<AdminNotification>[],
    onSelect: (notification: TableRow<AdminNotification>) => void
} & Omit<TableWrapperProps, "children">

type NotificationRowProps = {
    tableRow: TableRow<AdminNotification>,
    onSelect: (notification: TableRow<AdminNotification>) => void
    isSelected: boolean,
}

const NotificationRow = (props: NotificationRowProps) => {

    const router = useRouter()

    const wrapperCV: ClassValue[] = [
        "-mx-7 px-7 w-full flex flex-row items-center justify-between py-7",
        "border-b-2 border-light-gray hoverable pointer px-7",
        {"hover:bg-bg-light-blue": props.tableRow.item.type !== "Проблема"},
        {"pl-[65px] bg-red-50": props.tableRow.item.type === "Проблема"},
        {"bg-bg-light-blue": props.isSelected}
    ]

    const textCV: ClassValue = {
        "text-info-red": props.tableRow.item.type !== "Информация",
        "text-info-blue": props.tableRow.item.type === "Информация"
    }

    const buttonCV: ClassValue = {
        "text-info-red hover:text-red-800": props.tableRow.item.type !== "Информация",
        "text-link-blue hover:text-blue-800": props.tableRow.item.type === "Информация"
    }

    const handleButtonClick = () => console.log('Clicked')
    const handleSelectItem = () => {
        if (props.tableRow.item.type !== "Проблема") {
            props.onSelect(props.tableRow)
        }
    }

    return (
        <div className={cn(wrapperCV)} onClick={handleSelectItem}>
            <div className={"w-fit flex flex-row items-center gap-5"}>
                {
                    props.tableRow.item.type !== "Проблема" && <Checkbox
                        isSelected={props.isSelected}
                    />
                }
                <div className={"flex flex-col gap-1"}>
                    <Text
                        text={props.tableRow.item.type}
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
                text={'Перейти'}
                onClick={handleButtonClick}
            />
        </div>
    )

}

const NotificationContentTable = (props: NotificationContentTableProps) => {

    const selectedNotifications = useUnit($selectedNotifications)

    return (
        <TableWrapper classNames={{content: "-mt-7"}} {...props}>
            {props.tableContent.map((tableRow, rowKey) => (
                <NotificationRow
                    onSelect={props.onSelect}
                    isSelected={selectedNotifications.includes(tableRow)}
                    tableRow={tableRow}
                    key={rowKey}
                />
            ))}
        </TableWrapper>
    );

};

export default NotificationContentTable;
