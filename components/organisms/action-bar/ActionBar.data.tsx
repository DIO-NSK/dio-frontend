import { Feature } from "@/components/moleculas/quick-access/QuickAccess.types";
import { FiGrid, FiHeart, FiHome, FiShoppingCart, FiUser } from "react-icons/fi";

export const items: Feature[] = [
    {
        name: "Главная",
        icon: <FiHome />,
        link: "/"
    },
    {
        name: 'Каталог',
        icon: <FiGrid />,
        link: "/mobile/menu/catalog"
    },
    {
        name: "Корзина",
        icon: <FiShoppingCart />,
        link: "/cart"
    },
    {
        name: "Избранное",
        icon: <FiHeart />,
        link: "/favorites"
    },
    {
        name: "Профиль",
        icon: <FiUser />,
        link: "/profile"
    }
]