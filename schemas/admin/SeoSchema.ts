import { z } from "zod";

export const SeoSchema = z.object({
    title: z.string().max(80, 'Длина заголовка не может быть больше 80 символов.').optional(),
    description: z.string().max(512, 'Описание не может быть больше 512 символов.').optional(),
    keywords: z.string().refine(string => string.split(',').length < 20).optional(),
    urlMask: z.string().optional(),
})

export type SeoData = z.infer<typeof SeoSchema>;