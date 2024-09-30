import { TableHeaderItem } from "@/types/dto/Table";

const staticPages: Record<number, { name: string, urlMask: string }> = {
    13: { name: 'О компании', urlMask: 'about-company' },
    14: { name: 'Бонусная программа', urlMask: 'bonus-program' },
    15: { name: 'Контакты', urlMask: 'contacts' },
    16: { name: 'Рассрочка', urlMask: 'installment-plan' },
    17: { name: 'Оплата и возврат товара', urlMask: 'payment' },
    18: { name: 'Политика конфиденциальности', urlMask: 'policy' },
    19: { name: 'Возврат и обмен товара', urlMask: 'returning' },
    20: { name: 'Сервисный центр', urlMask: 'service-center' },
}

const talbeHeader: TableHeaderItem[] = [
    { text: 'Страница', width: 'col-span-2' },
    { text: 'Ссылка', width: 'col-span-2' },
    { text: 'Описание', width: 'col-span-2' },
]

export { staticPages, talbeHeader };