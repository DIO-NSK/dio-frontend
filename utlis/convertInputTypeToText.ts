import {CharacteristicType} from "@/types/dto/Characteristic";

export function convertInputTypeToText(type: CharacteristicType): string {
    switch (type) {
        case "TEXT":
            return "Текстовое значение"
        case "FLOAT":
            return "Дробное значние"
        case "NUMBER" :
            return "Целочисленное значение"
    }
}