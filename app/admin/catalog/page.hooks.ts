import {TextTableRow} from "@/types/dto/Table";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";

export const useAdminPanelCatalogPage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const tableContent: TextTableRow[] = [
        {items: ["Воды питьевые"]},
        {items: ["Бытовая химия и гигиена"]},
        {items: ["Безалкогольные напитки"]},
        {items: ["Одноразовая посуда"]},
        {items: ["Кофе и чай"]},
        {items: ["Добавки к напиткам"]},
    ]

    const [isEditable, setEditable] = useState<boolean>(false)

    const [searchValue, setSearchValue] = useState<string>("")
    const [isPopupVisible, setPopupVisible] = useState<boolean>(false)

    const handleExportCatalog = () => console.log("Exported")
    const handleSwitchPopupState = () => setPopupVisible(!isPopupVisible)
    const handleSwitchEditable = () => setEditable(!isEditable)
    const handleRowClick = () => router.push(pathname.concat("/section/sectionId"))

    return {
        tableContent,
        searchbar: {searchValue, setSearchValue},
        popup : {handleSwitchPopupState, isPopupVisible},
        editMode : {isEditable, handleSwitchEditable},
        handleExportCatalog, handleRowClick
    }

}