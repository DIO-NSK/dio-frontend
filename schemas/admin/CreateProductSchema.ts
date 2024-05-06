import z from "zod"
import {requiredFiledError} from "@/schemas";
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {SelectItem} from "@/types/props/SelectItem";

export const priceTypeItems : SelectItem<string>[] = [
    {name : "Цена за штуку", value : "unit"},
    {name : "Цена за упаковку", value : "package"},
]

export const CategoryPropertySchema = z.object({
    valueType: z.string().min(1, requiredFiledError),
    value: z.string().min(1, requiredFiledError),
    propertyId: z.number()
})

export const ExternalPropertySchema = z.object({
    name: z.string().min(1, requiredFiledError),
    value: z.string().min(1, requiredFiledError),
}).optional()

export const CreateProductSchema = z.object({
    name: z.string().min(1, requiredFiledError).optional(),
    description: z.string().min(60, "Минимальная длина описания — 60 символов."),
    crmGroup: z.string().min(1, requiredFiledError),
    crmCode: z.string().min(1, requiredFiledError),
    price: z.string().min(0).or(z.number()).optional(),
    taxPercent: z.string().min(0).or(z.number()).optional(),
    discountPercent: z
        .string()
        .transform(discountPercent => discountPercent && +discountPercent)
        .or(z.null())
        .or(z.number())
        .optional(),
    isProductOfTheDay: z.boolean(),
    filledProperties: z.array(CategoryPropertySchema),
    externalProperties: z.array(ExternalPropertySchema).optional(),
    photos: z.array(z.custom<File>((v) => v instanceof File).or(z.string())),
    isInvisible: z.boolean().optional(),
    priceType: SelectInputSchema.optional()
})

export type CategoryPropertyData = z.infer<typeof CategoryPropertySchema>
export type CreateProductData = z.infer<typeof CreateProductSchema>