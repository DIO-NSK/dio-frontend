import z from "zod"
import {requiredFiledError} from "@/schemas";

export const CategoryPropertySchema = z.object({
    value : z.string().min(1, requiredFiledError),
    propertyId : z.number()
})

export const CreateProductSchema = z.object({
    name: z.string().min(1, requiredFiledError).optional(),
    description: z.string().min(60, "Минимальная длина описания — 60 символов."),
    crmGroup: z.string().min(1, requiredFiledError),
    crmCode: z.string().min(1, requiredFiledError),
    price: z.string().min(0).optional(),
    taxPercent: z.string().min(0).optional(),
    discountPercent: z.string().min(1, requiredFiledError).transform(discountPercent => +discountPercent),
    isProductOfTheDay: z.boolean(),
    filledProperties: z.array(CategoryPropertySchema),
    photos : z.array(z.custom<File>((v) => v instanceof File)),
    productImages : z.array(z.string()).optional()
})

export type CategoryPropertyData = z.infer<typeof CategoryPropertySchema>
export type CreateProductData = z.infer<typeof CreateProductSchema>