import z from "zod"
import {requiredFiledError} from "@/schemas";
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {CharacteristicSchema} from "@/schemas/dto/CharacteristicSchema";

export const CreateProductSchema = z.object({
    name: z.string().min(1, requiredFiledError),
    description: z.string().min(60, "Минимальная длина описания — 60 символов."),
    crmGroup: SelectInputSchema,
    crmCode: z.string().min(1, requiredFiledError),
    price: z.string().min(1, requiredFiledError).transform(price => +price),
    taxPercent: z.string().min(1, requiredFiledError).transform(taxPercent => +taxPercent),
    discountPercent: z.string().min(1, requiredFiledError).transform(discountPercent => +discountPercent),
    isProductOfTheDay: z.boolean(),
    filledProperties: z.array(CharacteristicSchema),
    photos : z.array(z.instanceof(File))
})

export type CreateProductData = z.infer<typeof CreateProductSchema>