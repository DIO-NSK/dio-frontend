import {TextTableRow} from "@/types/dto/Table";
import {usePathname, useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$categories, pageDidMountEvent} from "@/models/admin/category";
import {$nameToSearch} from "@/models/admin/section";
import {useEffect} from "react";

export const useAdminPanelCategoriesPage = (sectionId: number) => {

    const [
        nameToSearch,
        pageDidMount, categories
    ] = useUnit([$nameToSearch, pageDidMountEvent, $categories])

    const pathname = usePathname()
    const router = useRouter()

    const tableContent: TextTableRow[] = categories
        .filter(category => category.name.includes(nameToSearch))
        .map(category => ({item: [category.name], id: category.id, itemsWidth: ["col-span-full"]}))

    useEffect(() => {
        pageDidMount(sectionId)
    }, [pageDidMount])

    const handleExportCatalog = () => console.log("Exported")
    const handleRowClick = () => router.push(pathname.concat("/category/categoryId"))

    return {
        tableContent, handleExportCatalog,
        handleRowClick
    }

}