import {SelectItem} from "@/types/props/SelectItem";

export type Characteristic = {
    name : string,
    type : SelectItem<CharacteristicType>
}

export type CharacteristicType = "Дробное значение" | "Целочисленное значение" | "Текстовое значение"