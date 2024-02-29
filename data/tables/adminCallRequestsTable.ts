import {CallRequestTableRow, TableHeaderItem} from "@/types/dto/Table";
import {CallRequest} from "@/types/dto/CallRequest";

const callRequestsTableHeader: TableHeaderItem[] = [
    {text: "Данные клиента", width: "col-span-2"},
    {text: "Дата", width: "col-span-1"},
    {text: "Комментарий", width: "col-span-5"},
]

const callRequestsTableItem1: CallRequest = {
    customer: {
        valueName: "Третьяков Артём",
        phoneNumber: "+7 (000)  000-00-00"
    },
    date: "14.12.2023",
    time: "19:12:32",
    comment: "Добрый день! У меня появился вопрос касательно обработки информации в вашем мобильном приложении. Конкретнее, как мне можно посмотреть все фотографии в карточке продукта?",
    id: Symbol()
}

const callRequestsTableItem2: CallRequest = {
    customer: {
        valueName: "Третьяков Артём",
        phoneNumber: "+7 (000)  000-00-00"
    },
    date: "14.12.2023",
    time: "19:12:32",
    comment: "Добрый день! У меня появился вопрос касательно обработки информации в вашем мобильном приложении. Конкретнее, как мне можно посмотреть все фотографии в карточке продукта?",
    id: Symbol()
}


const callRequestsTableItem3: CallRequest = {
    customer: {
        valueName: "Третьяков Артём",
        phoneNumber: "+7 (000)  000-00-00"
    },
    date: "14.12.2023",
    time: "19:12:32",
    comment: "Добрый день! У меня появился вопрос касательно обработки информации в вашем мобильном приложении. Конкретнее, как мне можно посмотреть все фотографии в карточке продукта?",
    id: Symbol()
}


const callRequestsTableContent: CallRequestTableRow[] = [
    {item: callRequestsTableItem1}, {item: callRequestsTableItem2}, {item: callRequestsTableItem3},
]

export {
    callRequestsTableHeader,
    callRequestsTableContent
}