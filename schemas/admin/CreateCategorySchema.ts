import {z} from "zod"
import {requiredFiledError} from "@/schemas";

const SelectInputSchema = z.object({
    name: z.string(),
    value: z.string()
})

const CharacteristicSchema = z.object({
    name: z.string().min(1, requiredFiledError),
    valueName: z.string().min(1, requiredFiledError),
    valueType: SelectInputSchema,
    sequenceNumber: z.number(),
})

export const CreateCategorySchema = z.object({
    name: z.string().min(1, requiredFiledError),
    properties: z.array(CharacteristicSchema)
})

export type CreateCategoryData = z.infer<typeof CreateCategorySchema>
export type CharacteristicData = z.infer<typeof CharacteristicSchema>

export const defaultCharacteristicData: CharacteristicData = {
    name: "", valueName: "",
    valueType: {name: "Текстовое значение", value: "Текстовое значение"},
    sequenceNumber: 0
}