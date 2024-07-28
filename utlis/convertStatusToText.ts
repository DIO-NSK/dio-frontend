import {OrderStatus} from "@/types/dto/user/order/ResponseProfileOrder";

export function convertStatusToText(orderStatus : OrderStatus) {
    switch (orderStatus) {
        case "DRAFT": return "Черновик заказа"
        case "PENDING": return "Ожидает обработки"
        case "PROCESSING": return "В процессе обработки"
        case "SHIPPED": return "Отправлен"
        case "DELIVERED": return "Доставлен"
        case "CANCELED" : return "Отменен"
    }
}