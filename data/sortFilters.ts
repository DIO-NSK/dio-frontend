import {SelectItem} from "@/types/props/SelectItem";

export const selectableFilters: SelectItem<string>[] = [
    {name: "Сначала недорогие", value: 'price,asc'},
    {name: "Сначала дорогие", value: 'price,desc'}
]