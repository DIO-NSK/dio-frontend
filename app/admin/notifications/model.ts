import {api} from "@/api";
import {createEffect, createEvent, createStore, sample} from "effector";
import {TableRow} from "@/types/dto/Table";

export type AdminNotificationType = 'Информация' | 'Предупреждение' | 'Проблема'

export type AdminNotification = {
    id : number,
    message : string,
    type : AdminNotificationType
}

const getNotifications = async () : Promise<AdminNotification[]> => {
    return api.get('/admin/notification')
        .then(response => response.data)
}

const getNotificationsFx = createEffect<void, AdminNotification[], Error>(getNotifications)
export const getNotificationsEvent = createEvent<void>()

export const $notifications = createStore<TableRow<AdminNotification>[]>([])

$notifications.on(getNotificationsFx.doneData, (_, notifications) => {
    return notifications.map(notification => ({id : notification.id, item : notification}) as TableRow<AdminNotification>)
})

sample({
    clock : getNotificationsEvent,
    target : getNotificationsFx
})