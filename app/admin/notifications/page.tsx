"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Button from "@/components/atoms/buttons/button/Button";
import React, {useEffect} from "react";
import {useUnit} from "effector-react";
import {
    $notifications, $selectedNotifications, deleteAllNotificationsEvent,
    getNotificationsEvent, resetSelectedNotificationsEvent,
    selectAllNotificationsEvent,
    selectOneNotificationEvent
} from "@/app/admin/notifications/model";
import dynamic from "next/dynamic";
import Loading from "@/components/mobile/loading/Loading";

const NotificationTable = dynamic(
    () => import("@/components/organisms/tables/notification-content-table/NotificationContentTable"),
    {loading: () => <Loading/>}
)

const AdminPanelNotificationsPage = () => {

    const resetSelectedNotification = useUnit(resetSelectedNotificationsEvent)
    const [selectedNotifications, deleteAllNotifications] = useUnit([$selectedNotifications, deleteAllNotificationsEvent])
    const [selectOneNotification, selectAllNotifications] = useUnit([selectOneNotificationEvent, selectAllNotificationsEvent])
    const [notifications, getNotifications] = useUnit([$notifications, getNotificationsEvent])

    useEffect(() => {
        getNotifications()
    }, []);

    return (
        <React.Fragment>
            <HeaderRow
                theme={"bordered"}
                className={"w-full"}
                header={"Уведомления"}
                leftContent={
                    <div className={"w-fit flex flex-row items-baseline gap-4"}>
                        {
                            selectedNotifications.length > 0 &&
                            <div className={"flex flex-row items-baseline gap-4"}>
                                <Text
                                    text={`Выбрано ${selectedNotifications.length}`}
                                    className={"text-text-gray"}
                                />
                                <TextButton
                                    onClick={resetSelectedNotification}
                                    text={"Отменить выбор"}
                                    className={"text-info-red hover:text-red-700"}
                                />
                            </div>
                        }
                        <TextButton
                            onClick={selectAllNotifications}
                            text={"Выбрать всё"}
                        />
                    </div>
                }
                rightContent={
                    <Button
                        onClick={deleteAllNotifications}
                        text={"Удалить"} buttonType={"SECONDARY"}
                        size={"sm"}
                    />
                }
            />

            <NotificationTable
                tableContent={notifications}
                selectedItems={selectedNotifications}
                onSelect={selectOneNotification}
            />

        </React.Fragment>
    );

};

export default AdminPanelNotificationsPage;
