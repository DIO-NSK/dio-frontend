import {Category} from "@/types/dto/Category";
import {useEffect, useState} from "react";

export const useCatalogPopup = () => {

    const categories: Category[] = [
        {text: "Воды питьевые", id: 1},
        {text: "Безалкогольные напитки", id: 2},
        {text: "Одноразовая посуда", id: 3},
        {text: "Кофе и чай", id: 4},
        {text: "Добавки к напиткам", id: 5},
        {text: "Батончики, пасты, снеки", id: 6},
        {text: "Канцелярские товары", id: 7},
        {text: "Кулеры для воды", id: 8},
        {text: "Помпы, диспенсеры, аксессуары", id: 9},
        {text: "Пурифайеры и системы фильтрации", id: 10},
        {text: "Бутылки, пробки, аксессуары ", id: 11},
    ]

    const initSubcategories = [
        {
            id: 1,
            items: [
                "Средства гигиены", "Губки, перчатки и салфетки",
                "Мешки для мусора", "Освежители воздуха",
                "Чистящие средства"
            ]
        },
        {
            id: 2,
            items: [
                "Крутая категория",
                "Ещё какая-то категория",
                "Офигенная категория",
                "Кетчупы и соусы"
            ]
        }
    ]

    // side tab bar
    const [
        activeTab,
        setActiveTab
    ] = useState<Category>(categories[0])

    const [
        subcategories,
        setSubcategories
    ] = useState<{ id: number, items: string[]}>()

    useEffect(() => {
        const subcategoriesToFind = initSubcategories.find(
            item => item.id == activeTab.id)
        setSubcategories(subcategoriesToFind)
    }, [activeTab])

    return {
        categoriesSidebar: {categories, activeTab, setActiveTab},
        subcategories
    }

}