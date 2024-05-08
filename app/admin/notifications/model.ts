import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {TableRow} from "@/types/dto/Table";

export type AdminNotificationType = 'Информация' | 'Предупреждение' | 'Проблема'

export type AdminNotification = {
    id: number,
    message: string,
    type: AdminNotificationType
}

const getNotifications = async (): Promise<AdminNotification[]> => {
    return api.get('/admin/notification')
        .then(response => response.data)
}

const deleteOneNotification = async (notificationId: number): Promise<void> => {
    return api.delete('/admin/notification', {params: {notificationId}})
        .then(response => response.data)
}

const deleteAllNotifications = async (ids: number[]) => {
    return Promise.all(ids.map(deleteOneNotification))
}

const getNotificationsFx = createEffect<void, AdminNotification[], Error>(getNotifications)
export const getNotificationsEvent = createEvent<void>()

export const $notifications = createStore<TableRow<AdminNotification>[]>([])
export const $selectedNotifications = createStore<TableRow<AdminNotification>[]>([])
export const selectAllNotificationsEvent = createEvent<void>()
export const selectOneNotificationEvent = createEvent<TableRow<AdminNotification>>()
export const resetSelectedNotificationsEvent = createEvent<void>()

const deleteAllNotificationsFx = createEffect(deleteAllNotifications)
export const deleteAllNotificationsEvent = createEvent<void>()

sample({
    clock: deleteAllNotificationsEvent,
    source: $selectedNotifications,
    fn: (notifications) => notifications.map(tableRow => tableRow.item.id),
    target: deleteAllNotificationsFx
})

sample({
    clock: selectAllNotificationsEvent,
    source: $notifications,
    fn: (notifications) => notifications.filter(tableRow => tableRow.item.type !== 'Проблема'),
    target: $selectedNotifications
})

$selectedNotifications
    .on(selectOneNotificationEvent, (selected, notification) => {
        return selected.includes(notification) ? selected.filter(item => item !== notification) : [...selected, notification]
    })
    .reset(resetSelectedNotificationsEvent)

$notifications.on(getNotificationsFx.doneData, (_, notifications) => {
    return notifications.map(notification => ({id: notification.id, item: notification}) as TableRow<AdminNotification>)
})

sample({
    clock : deleteAllNotificationsFx.doneData,
    target : resetSelectedNotificationsEvent
})

sample({
    clock: [getNotificationsEvent, deleteAllNotificationsFx.doneData],
    target: getNotificationsFx
})