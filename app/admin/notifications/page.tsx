"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Button from "@/components/atoms/buttons/button/Button";
import {notificationTableContent} from "@/data/tables/adminNotificationTable";
import {useSelectable} from "@/utlis/hooks/useSelectable";
import {Notification} from "@/types/dto/Notification";
import NotificationContentTable
    from "@/components/organisms/tables/notification-content-table/NotificationContentTable";

const AdminPanelNotificationsPage = () => {

    const filterCallback = (item : Notification) => item.type !== "critical"
    const defaultItems = notificationTableContent.map(i => i.item)
    const {...selectableContext} = useSelectable<Notification>(defaultItems, filterCallback)

    const handleDeleteNotifications = () => console.log("Notifications deleted")

    return (
        <>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Уведомления"}
                leftContent={
                    <div className={"w-fit flex flex-row items-baseline gap-4"}>
                        {
                            selectableContext.selectedItems.length > 0 &&
                            <div className={"flex flex-row items-baseline gap-4"}>
                                <Text
                                    text={`Выбрано ${selectableContext.selectedItems.length}`}
                                    className={"text-text-gray"}
                                />
                                <TextButton
                                    onClick={selectableContext.handleRemoveSelectAll}
                                    text={"Отменить выбор"}
                                    className={"text-info-red hover:text-red-700"}
                                />
                            </div>
                        }
                        <TextButton
                            onClick={selectableContext.handleSelectAllItems}
                            text={"Выбрать всё"}
                        />
                    </div>
                }
                rightContent={
                    <Button
                        onClick={handleDeleteNotifications}
                        text={"Удалить"} buttonType={"SECONDARY"}
                        size={"sm"}
                    />
                }
            />

            <NotificationContentTable
                tableContent={notificationTableContent}
                selectedItems={selectableContext.selectedItems}
                onSelect={selectableContext.handleSelectItem}
            />

        </>
    );

};

export default AdminPanelNotificationsPage;
