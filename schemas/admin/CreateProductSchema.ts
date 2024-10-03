import z from "zod"
import {requiredFiledError} from "@/schemas";
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {SelectItem} from "@/types/props/SelectItem";
import { SeoSchema } from "./SeoSchema";

export const priceTypeItems: SelectItem<string>[] = [
    {name: "Цена за штуку", value: "unit"},
    {name: "Цена за упаковку", value: "package"},
]

export const disallowSymbolsMessage = "Поле не должно содержать запятой, двоеточия и тире"
export const disallowSymbolsRegex = /^[^,:-]+$/

export const CategoryPropertySchema = z.object({
    valueType: z.string().min(1, requiredFiledError),
    value: z.string().min(1, requiredFiledError),
    propertyId: z.number()
})

const SpecialSymbolsCategoryPropertySchema = z.object({
    valueType: z.string().min(1, requiredFiledError),
    value: z.string().min(1, requiredFiledError).refine(item => disallowSymbolsRegex.test(item), disallowSymbolsMessage),
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
    filledProperties: z.array(SpecialSymbolsCategoryPropertySchema),
    externalProperties: z.array(ExternalPropertySchema).optional(),
    photos: z.array(z.string()),
    isInvisible: z.boolean().optional(),
    priceType: SelectInputSchema.optional(),
    seoEntityDto : z.object({
        title: z.string().max(80, 'Длина заголовка не может быть больше 80 символов.').optional(),
        description: z.string().max(512, 'Описание не может быть больше 512 символов.').optional(),
        urlMask: z.string().min(1, requiredFiledError),
        keywords: z.string().refine(string => string.split(',').length < 20).optional(),
    })
})

export type CategoryPropertyData = z.infer<typeof CategoryPropertySchema>
export type CreateProductData = z.infer<typeof CreateProductSchema>