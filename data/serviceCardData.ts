import {ServiceCardDTO} from "@/components/wrappers/service-card/ServiceCard";

const mockServiceCard : ServiceCardDTO = {
    header : "Аренда настольного холодильника с пурифаером",
    descr : "Аренда может осуществляться как на краткосрочной основе, так и на длительный период." +
        " Напольный кулер с нагревом и охлаждением и с холодильником на 16 литров",
    rentTime : [
        {name : "До недели", value : "750"},
        {name : "Помесечная аренда", value : "750"},
        {name : "6 месяцев", value : "4400"},
        {name : "1 год", value : "8500"},
    ],
    additional : [
        "Доставка и установка кулера",
        "Сервисное обслуживание и ремонт неисправностей, возникших не по вине клиента",
        "Санитарная обработка 1 раз в год"
    ],
    price : 2000
}

export const mockServiceCardArray : ServiceCardDTO[] = [
    mockServiceCard, mockServiceCard, mockServiceCard
]