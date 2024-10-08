import { requiredFiledError } from "@/schemas";
import dayjs from "dayjs";
import { z } from "zod";

import ru from 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.locale(ru)
dayjs.extend(customParseFormat);

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
    deadline: z.string().min(1, requiredFiledError)
               .refine(date => dayjs(date.replace('до ', ''), 'DD.MM.YYYY', true).isValid(), { message: 'Некорректная дата' })
               .refine(date => dayjs(date.replace('до ', ''), 'DD.MM.YYYY', true).isAfter(dayjs(Date.now())), { message: `Дата окончания акции должна быть после ${dayjs(Date.now()).format('DD.MM.YYYY')}` }),
    description: z.string().min(1, requiredFiledError),
    productIdList: z.array(ProductIdSchema)
        .refine(arr => arr.length !== 0, { message: 'Укажите как минимум один продукт, участвующий в акции' })
        .refine(arr => arr.some(item => Boolean(item.productId) || Boolean(item.quantity)), { message: 'Все поля не должны быть пустыми' }),
    ruleList: z.array(RuleSchema)
        .refine(arr => arr.length !== 0, { message: 'Укажите как минимум одно правило для участия в акции' })
        .refine(arr => arr.some(item => item.rule.length !== 0), { message: 'Все правила для участия в акции не должны быть пустыми' }),
    photos: z.array(z.string()),
    seoEntityDto: z.object({
        title: z.string().max(80, 'Длина заголовка не может быть больше 80 символов.').optional(),
        description: z.string().max(512, 'Описание не может быть больше 512 символов.').optional(),
        urlMask: z.string().min(1, requiredFiledError),
        keywords: z.string().refine(string => string.split(',').length < 20).optional(),
    })
})

export type CreateSaleData = z.infer<typeof CreateSaleSchema>