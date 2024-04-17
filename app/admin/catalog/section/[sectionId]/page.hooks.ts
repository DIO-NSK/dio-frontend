import {TableRow, TextTableRow} from "@/types/dto/Table";
import {usePathname, useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$categories, pageDidMountEvent} from "./model";
import {$nameToSearch} from "@/app/admin/catalog/model";
import {useEffect} from "react";
import {
    $adminCategoryBreadcrumbs,
    getAdminCategoryBreadcrumbsEvent
} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/model";

export const useAdminPanelCategoriesPage = (sectionId: number) => {

    const [breadcrumbs, getBreadcrumbs] = useUnit([$adminCategoryBreadcrumbs, getAdminCategoryBreadcrumbsEvent])

    const [nameToSearch, pageDidMount, categories] =
        useUnit([$nameToSearch, pageDidMountEvent, $categories])

    const pathname = usePathname()
    const router = useRouter()

    const tableContent: TextTableRow[] = categories
        .filter(category => category.name.includes(nameToSearch))
        .map(category => ({item: [category.name], id: category.id!!, itemsWidth: ["col-span-full"]}))

    useEffect(() => {
        getBreadcrumbs(sectionId)
        pageDidMount(sectionId)
    }, [])

    const handleExportCatalog = () => console.log("Exported")
    const handleRowClick = (itemId : number) => router.push(pathname.concat(`/category/${itemId}`))

    const handleEditCategory = (tableRow: TableRow<string[]>) => {
        router.push(pathname.concat(`/category/${tableRow.id}/edit`))
    }

    return {
        breadcrumbs, tableContent, handleExportCatalog,
        handleRowClick, handleEditCategory
    }

}