import {TextTableRow} from "@/types/dto/Table";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";

export const useAdminPanelCategoriesPage = () => {

    const pathname = usePathname()
    const router = useRouter()

    const tableContent: TextTableRow[] = [
        {items: ["Средства гигиены"]},
        {items: ["Губки, перчатки и салфетки"]},
        {items: ["Мешки для мусора"]},
        {items: ["Освежители воздуха"]},
        {items: ["Чистящие средства"]},
    ]

    const [isEditable, setEditable] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>("")

    const handleExportCatalog = () => console.log("Exported")
    const handleAddNewCategory = () => router.push(pathname.concat("/new"))
    const handleSwitchEditable = () => setEditable(!isEditable)
    const handleRowClick = () => router.push(pathname.concat("/category/categoryId"))

    return {
        tableContent,
        searchbar: {searchValue, setSearchValue},
        editMode : {isEditable, handleSwitchEditable},
        handleExportCatalog, handleAddNewCategory, handleRowClick
    }

}