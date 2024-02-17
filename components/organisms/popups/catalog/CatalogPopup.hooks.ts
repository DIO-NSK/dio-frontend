import {Category} from "@/types/dto/Category";
import {useEffect, useState} from "react";
import {categories, initSubcategories} from "@/data/catalogData";

export const useCatalogPopup = () => {

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