import {OrderStatus} from "@/types/dto/Order";

export function convertStatusToText(orderStatus : OrderStatus) {
    switch (orderStatus) {
        case "delivered": return "Доставлен"
        case "pending": return "В ожидании"
        case "processing": return "В обработке"
        case "shipping": return "Отправлен"
        case "stale": return "В архиве"
    }
}