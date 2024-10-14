import { requiredFiledError } from "@/schemas";
import { z } from "zod";

export const CreateBannerSchema = z.object({
    link: z.string().min(1, requiredFiledError),
    mainImageUrl: z.string().min(1, requiredFiledError).or(z.null()),
    imageUrlDto : z.object({
        tabletHorizontalImageUrl : z.string().min(1, requiredFiledError).or(z.null()),
        tabletVerticalImageUrl : z.string().min(1, requiredFiledError).or(z.null()),
        mobileImageUrl : z.string().min(1, requiredFiledError).or(z.null()),
    })
})

export type CreateBannerData = z.infer<typeof CreateBannerSchema>