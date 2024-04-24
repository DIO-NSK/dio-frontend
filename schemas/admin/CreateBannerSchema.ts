import {z} from "zod"
import {requiredFiledError} from "@/schemas";

export const CreateBannerSchema = z.object({
    link: z.string().min(1, requiredFiledError),
    image: z.custom<File>((v) => v instanceof File).or(z.null()).or(z.string())
})

export type CreateBannerData = z.infer<typeof CreateBannerSchema>