import {SelectItem} from "@/types/props/Select";

export type Characteristic = {
    name : string,
    type : SelectItem<CharacteristicType>
}

export type CharacteristicType = "string" | "float" | "int"