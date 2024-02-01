import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";

export const useAdminPanelSalesPage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const [searchValue, setSearchValue] = useState<string>("")
    const [isEditable, setEditable] = useState<boolean>(false)

    const handleAddSale = () => router.push(pathname.concat('/new'))
    const handleSwitchEditable = () => setEditable(!isEditable)
    const handleProductClick = () => console.log("Clicked!")

    return {
        searchbar : {searchValue, setSearchValue},
        editMode : {isEditable, handleSwitchEditable},
        handleAddSale, handleProductClick
    }

}