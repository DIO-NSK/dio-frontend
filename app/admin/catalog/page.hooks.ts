import {TextTableRow} from "@/types/dto/Table";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";

export const useAdminPanelCatalogPage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const tableContent: TextTableRow[] = [
        {items: ["Воды питьевые"], itemsWidth : ["col-span-full"]},
        {items: ["Бытовая химия и гигиена"], itemsWidth : ["col-span-full"]},
        {items: ["Безалкогольные напитки"], itemsWidth : ["col-span-full"]},
        {items: ["Одноразовая посуда"], itemsWidth : ["col-span-full"]},
        {items: ["Кофе и чай"], itemsWidth : ["col-span-full"]},
        {items: ["Добавки к напиткам"], itemsWidth : ["col-span-full"]},
    ]

    const [isPopupVisible, setPopupVisible] = useState<boolean>(false)

    const handleExportCatalog = () => console.log("Exported")
    const handleSwitchPopupState = () => setPopupVisible(!isPopupVisible)
    const handleRowClick = () => router.push(pathname.concat("/section/sectionId"))

    return {
        tableContent,
        popup : {handleSwitchPopupState, isPopupVisible},
        handleExportCatalog, handleRowClick
    }

}