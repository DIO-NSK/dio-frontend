import {z} from "zod";
import {requiredFiledError} from "@/schemas";
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";

export const CharacteristicSchema = z.object({
    id : z.number().optional(),
    name: z.string().min(1, requiredFiledError),
    valueName: z.string().min(1, requiredFiledError),
    valueType: SelectInputSchema,
    sequenceNumber: z.number(),
})

export type CharacteristicData = z.infer<typeof CharacteristicSchema>

export const defaultCharacteristicData: CharacteristicData = {
    name: "", valueName: "",
    valueType: {name: "Текстовое значение", value: "TEXT"},
    sequenceNumber: 1
}