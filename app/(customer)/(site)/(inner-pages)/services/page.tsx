import { Metadata } from "next";
import ClientServicesScreen from "@/app/(customer)/(site)/(inner-pages)/services/ui/ClientServicesScreen";
import { getSeoByUrlMask } from "@/app/admin/seo/page.api";

const keywords = [
    "Аренда напольного кулера с холодильником",
    "Аренда напольного кулера",
    "Аренда настольного кулера",
    "Аренда пурифайера с электронным охлаждением",
    "Доставка пурифаера",
    "Установка и подключение к системе водоснабжения до 10 метров без скрытой установки",
    "Годовое сервисное обслуживание: Проводится 2 раза в год и включает в себя",
    "Опрессовку системы",
    "Дезинфекцию баков горячей и холодной воды",
    "Очистку и дезинфекцию кранов, каплесборника",
    "Очистку всех внешних панелей",
    "Замену 4х фильтров: осадочного, угольного, ультрафильтрационной мембраны, постугольного фильтра",
    "Дезинфекцию баков горячей и холодной воды",
    "Аренда пурифайера с компрессорным охлаждением",
    "Гарантийный ремонт пурифайера",
    "Выездная диагностика пурифайера",
    "Гарантийный ремонт кулера",
    "Выездная диагностика кулера",
    "Диагностика кулера",
    "Санитарная обработка кулера",
    "Выездная санитарная обработка кулера",
    "Установка пурифаеров",
    "Простая установка пуриайера",
    "Сложная (или скрытая) установка пурифайера",
    "Сервисное обслуживание оборудования",
    "Годовое 4-х разовое сервисное обслуживание пурифайера(офис более 50 человек)",
    "Годовое 2-х разовое сервисное обслуживание пурифайера (офис до 40 человек)",
    "Единоразовое полное сервисное обслуживание пурифайера",
    "Бесплатное пользование",
    "Настольный кулер с охлаждением в бесплатное пользование",
    "Настольный кулер без охлаждения в бесплатное пользование",
]

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoByUrlMask(__dirname.split('/').at(-1) as string);

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords
    }
}

// export const metadata: Metadata = {
//     title: 'Услуги — доставка питьевой воды по Новосибирску и области DIO',
//     keywords: keywords,
//     openGraph : {
//         title : 'Услуги — доставка питьевой воды по Новосибирску и области DIO'
//     }
// }

const ServiceCatalogScreen = async () => (<ClientServicesScreen />)

export default ServiceCatalogScreen
