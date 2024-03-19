import {Notification} from "@/types/dto/Notification";
import {TableRow} from "@/types/dto/Table";

const notification1 : Notification = {
    header : "Ошибка при выгрузке продукта",
    message : "Из-за ошибки на складе продукт временно не может быть выгружен. Попробуйте позже.",
    textLink : {
        text : "Перейти к продукту",
        link : "/admin/catalog/section/sectionId/category/categoryId/"
    },
    type : "critical"
}

const notification2 : Notification = {
    header : "Заказ #12009 поступил на склад",
    textLink : {
        text : "Смотреть заказ",
        link : "/admin/catalog/section/sectionId/category/categoryId/"
    },
    type : "info"
}

const notification3 : Notification = {
    header : "Товара «Ватные диски Nivea» осталось меньше 10 шт.",
    textLink : {
        text : "Перейти к продукту",
        link : "/admin/catalog/section/sectionId/category/categoryId/"
    },
    type : "warning"
}

const notification4 : Notification = {
    header : "Информация об услуге «Аренда кулеров и пурифайеров» была обновлена",
    textLink : {
        text : "Смотреть заказ",
        link : "/admin/catalog/section/sectionId/category/categoryId/"
    },
    type : "info"
}

export const notificationTableContent : TableRow<Notification>[] = [
    {id : 1, item : notification1}, {id : 2, item : notification2},
    {id : 3, item : notification3}, {id : 4, item : notification4},
]