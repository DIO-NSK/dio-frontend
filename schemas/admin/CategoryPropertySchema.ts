import {z} from 'zod'
import {requiredFiledError} from "@/schemas";
import {SelectInputSchema} from "@/schemas/dto/SelectInputSchema";
import {disallowSymbolsMessage, disallowSymbolsRegex} from "@/schemas/admin/CreateProductSchema";

const FilledPropertySchema = z.object({
    productId : z.number(),
    value : z.string().min(1, requiredFiledError).refine(item => disallowSymbolsRegex.test(item), disallowSymbolsMessage)
})

export const CategoryPropertySchema = z.object({
    propertyId: z.string().min(1, requiredFiledError),
    propertyName: z.string().min(1, requiredFiledError).refine(item => disallowSymbolsRegex.test(item), disallowSymbolsMessage),
    propertyType: SelectInputSchema,
    propertyValueName: z.string().min(1, requiredFiledError),
    filledProperties: z.array(FilledPropertySchema)
})

export const EditCategoryPropertySchema = z.object({
    categoryId: z.string().min(1, requiredFiledError),
    propertyName: z.string().min(1, requiredFiledError).refine(item => disallowSymbolsRegex.test(item), disallowSymbolsMessage),
    propertyType: SelectInputSchema,
    propertyValueName: z.string().min(1, requiredFiledError),
    filledProperties: z.array(FilledPropertySchema)
})

export type CategoryPropertyFormData = z.infer<typeof CategoryPropertySchema>
export type EditCategoryPropertyFormData = z.infer<typeof EditCategoryPropertySchema>