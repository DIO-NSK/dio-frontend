import { z } from "zod"
import { requiredFiledError } from "@/schemas";
import { SeoSchema } from "./SeoSchema";

const ProductIdSchema = z.object({
    productId: z.string().min(1, requiredFiledError).or(z.number()),
    quantity: z.string().min(1, requiredFiledError).or(z.number())
})

const RuleSchema = z.object({
    rule: z.string().min(1, requiredFiledError)
})

export const CreateSaleSchema = z.object({
    name: z.string().min(1, requiredFiledError),
    crmGroup: z.string().min(1, requiredFiledError),
    crmCode: z.string().min(1, requiredFiledError),
    deadline: z.string().min(1, requiredFiledError),
    description: z.string().min(1, requiredFiledError),
    productIdList: z.array(ProductIdSchema),
    ruleList: z.array(RuleSchema),
    photos: z.array(z.string()),
    seoEntityDto: SeoSchema
})

export type CreateSaleData = z.infer<typeof CreateSaleSchema>