import {SelectItem} from "@/types/props/SelectItem";

export type Characteristic = {
    name : string,
    type : SelectItem<CharacteristicType>
}

export type CharacteristicType = "NUMBER" | "FLOAT" | "TEXT"