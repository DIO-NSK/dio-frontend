import {usePathname, useRouter} from "next/navigation";
import {TextAction} from "@/types/dto/text";
import {useState} from "react";
import {AdminProduct} from "@/types/dto/AdminProduct";

export const useAdminPanelProductsPage = () => {

    const pathname = usePathname()
    const router = useRouter()

    const breadcrumbsData: TextAction[] = [
        {text : "Бытовая химия и гигиена", action : () => router.push("/admin/catalog")},
        {text : "Губки, перчатки и салфетки", action : () => router.push("/admin/catalog/section/sectionId")},
        {text : "Товары", action: () => {}}
    ]

    const [isEditable, setEditable] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>("")

    const handleExportCatalog = () => console.log("Exported")
    const handleAddNewProduct = () => router.push(pathname.concat("/new"))
    const handleSwitchEditable = () => setEditable(!isEditable)
    const handleProductClick = (product : AdminProduct) => console.log("PRODUCT", product)

    return {
        breadcrumbsData,
        searchbar: {searchValue, setSearchValue},
        editMode : {isEditable, handleSwitchEditable},
        handleExportCatalog, handleAddNewProduct,
        handleProductClick
    }

}