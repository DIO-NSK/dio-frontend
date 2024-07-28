import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const CreateBannerSchema = z.object({
    link: z.string().min(1, requiredFiledError),
    imageUrl: z.string().min(1, requiredFiledError).or(z.null())
})

export type CreateBannerData = z.infer<typeof CreateBannerSchema>