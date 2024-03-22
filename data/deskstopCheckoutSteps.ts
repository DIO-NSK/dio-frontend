import {SelectItem} from "@/types/props/SelectItem";

export const desktopCheckoutSteps: SelectItem<number>[] = [
    {name: "Данные получателя", value: 0},
    {name: "Дата и время доставки", value: 1},
    {name: "Подтверждение", value: 2}
]