import {IconTextLink} from "@/types/links";

import MailIcon from "@/public/icons/main-icon.png"
import GeoIcon from "@/public/icons/map-icon.png"

export const footerData: IconTextLink[] = [
    {text: "О компании", path: "/about"},
    {text: "Доставка", path: "/about"},
    {text: "Контакты", path: "/about"},
    {text: "Оплата", path: "/about"},
    {text: "Новинки", path: "/about"},
    {text: "Товары по скидке", path: "/about"},
    {text: "Акции", path: "/about"},
    {text: "Услуги", path: "/about"},
    {text: "Бонусная программа", path: "/about"},
    {text: "Возврат и обмен товара", path: "/about"},
    {text: "Сервисный центр", path: "/about"},
    {text: "Рассрочка", path: "/about"},
    {text: "Политика конфиденциальности", path: "/about"},
    {icon: MailIcon.src, text: "info@dio.ru", path: "/about"},
    {icon: GeoIcon.src, text: "Россия, г. Новосибирск, ул. Тимакова 6/1", path: "/about"},
]