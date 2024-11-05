import { FiCheck, FiDroplet, FiGift, FiGrid } from "react-icons/fi";
import { Feature } from "./QuickAccess.types";

export const features : Feature[] = [
    {
        name : 'Акции',
        icon : <FiGift/>,
        link : "/sales"
    },
    {
        name : 'Услуги',
        icon : <FiCheck/>,
        link : "/services"
    },
    {
        name : 'Вода',
        icon : <FiDroplet/>,
        link : "/our-waters"
    },
    {
        name : 'Каталог',
        icon : <FiGrid/>,
        link : "/mobile/menu/catalog"
    },
]