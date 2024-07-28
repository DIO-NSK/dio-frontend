import {TableHeaderItem} from "@/types/dto/Table";

export const adminDayProductTableHeader : TableHeaderItem[] = [
    {text: "Название", width: "col-span-6"},
    {text: "Скидка", width: "col-span-1"},
    {text: "Цена, шт.", width: "col-span-1"}
]

export const adminProductTableHeader: TableHeaderItem[] = [
    {text: "Название", width: "col-span-5"},
    {text: "Скидка", width: "col-span-1"},
    {text: "На складе", width: "col-span-1"},
    {text: "Цена, шт.", width: "col-span-1"}
]