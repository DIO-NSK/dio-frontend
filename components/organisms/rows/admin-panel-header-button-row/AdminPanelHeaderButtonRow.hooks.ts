import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";

export const useAdminPanelHeaderButtonRow = () => {

    const router = useRouter()
    const pathname = usePathname()

    const [searchValue, setSearchValue] = useState<string>("")
    const handleAddItem = () => router.push(pathname.concat('/new'))

    return {
        searchbar : {searchValue, setSearchValue},
        handleAddItem
    }

}