import {TextTableRow} from "@/types/dto/Table";
import {usePathname, useRouter} from "next/navigation";

export const useAdminPanelCategoriesPage = () => {

    const pathname = usePathname()
    const router = useRouter()

    const tableContent: TextTableRow[] = [
        {items: ["Средства гигиены"], itemsWidth : ["col-span-full"]},
        {items: ["Губки, перчатки и салфетки"], itemsWidth : ["col-span-full"]},
        {items: ["Мешки для мусора"], itemsWidth : ["col-span-full"]},
        {items: ["Освежители воздуха"], itemsWidth : ["col-span-full"]},
        {items: ["Чистящие средства"], itemsWidth : ["col-span-full"]},
    ]

    const handleExportCatalog = () => console.log("Exported")
    const handleRowClick = () => router.push(pathname.concat("/category/categoryId"))

    return {
        tableContent, handleExportCatalog, handleRowClick
    }

}