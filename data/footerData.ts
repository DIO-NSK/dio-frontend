import {IconTextLink} from "@/types/links";

import MailIcon from "@/public/icons/main-icon.png"
import GeoIcon from "@/public/icons/map-icon.png"

export const footerData: IconTextLink[] = [
    {text: "О компании", path: "/about-company"},
    {text: "Доставка", path: "/payment"},
    {text: "Контакты", path: "/contacts"},
    {text: "Оплата", path: "/payment"},
    {text: "Товары по акции", path: "/#sales"},
    {text: "Акции", path: "/sales"},
    {text: "Услуги", path: "/services"},
    {text: "Бонусная программа", path: "/about"},
    {text: "Возврат и обмен товара", path: "/returning"},
    {text: "Сервисный центр", path: "/about"},
    {text: "Рассрочка", path: "/installment-plan"},
    {text: "Политика конфиденциальности", path: "/policy"},
    {icon: MailIcon.src, text: "info@dio.ru", path : "/", href: "mailto:info@3339900.ru"},
    {icon: GeoIcon.src, text: "Россия, г. Новосибирск, ул. Тимакова 6/1", path : "/", href: "https://go.2gis.com/wjb501"},
]