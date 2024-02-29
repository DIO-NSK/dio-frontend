import {usePathname, useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$nameToSearch, onChangeNameToSearch} from "@/models/admin/section";

export const useAdminPanelHeaderButtonRow = () => {

    const [nameToSearch, setNameToSearch] = useUnit([$nameToSearch, onChangeNameToSearch])

    const router = useRouter()
    const pathname = usePathname()

    const handleAddItem = () => router.push(pathname.concat('/new'))

    return {
        searchbar: {searchValue : nameToSearch, setSearchValue : setNameToSearch},
        handleAddItem
    }

}