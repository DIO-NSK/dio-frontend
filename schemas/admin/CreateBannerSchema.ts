import { requiredFiledError } from "@/schemas";
import { z } from "zod";

export const CreateBannerSchema = z.object({
    link: z.string().min(1, requiredFiledError),
    mainImageUrl: z.string().min(1, requiredFiledError),
    imageUrlDto: z.object({
        tabletHorizontalImageUrl: z.string().min(1, requiredFiledError),
        tabletVerticalImageUrl: z.string().min(1, requiredFiledError),
        mobileImageUrl: z.string().min(1, requiredFiledError),
    })
})

export type CreateBannerData = z.infer<typeof CreateBannerSchema>