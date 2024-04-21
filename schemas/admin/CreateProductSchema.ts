import z from "zod"
import {requiredFiledError} from "@/schemas";

export const CategoryPropertySchema = z.object({
    valueType : z.string().min(1, requiredFiledError),
    value: z.string().min(1, requiredFiledError),
    propertyId: z.number()
})

export const CreateProductSchema = z.object({
    name: z.string().min(1, requiredFiledError).optional(),
    description: z.string().min(60, "Минимальная длина описания — 60 символов."),
    crmGroup: z.string().min(1, requiredFiledError),
    crmCode: z.string().min(1, requiredFiledError),
    price: z.string().min(0).or(z.number()).optional(),
    taxPercent: z.string().min(0).or(z.number()).optional(),
    discountPercent: z.string().or(z.null()).optional().transform(discountPercent => discountPercent && +discountPercent),
    isProductOfTheDay: z.boolean(),
    filledProperties: z.array(CategoryPropertySchema),
    photos: z.array(z.custom<File>((v) => v instanceof File)),
    productImages: z.array(z.string()).optional()
})

export const defaultCreateProductSchema = {
    name: undefined,
    description: undefined,
    crmGroup: undefined,
    crmCode: undefined,
    price: undefined,
    taxPercent: undefined,
    discountPercent: undefined,
    isProductOfTheDay: undefined,
}

export type CategoryPropertyData = z.infer<typeof CategoryPropertySchema>
export type CreateProductData = z.infer<typeof CreateProductSchema>