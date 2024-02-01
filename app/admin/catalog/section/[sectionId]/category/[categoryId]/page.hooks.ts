import {useRouter} from "next/navigation";
import {TextAction} from "@/types/dto/text";
import {AdminProduct} from "@/types/dto/AdminProduct";

export const useAdminPanelProductsPage = () => {

    const router = useRouter()

    const breadcrumbsData: TextAction[] = [
        {text : "Бытовая химия и гигиена", action : () => router.push("/admin/catalog")},
        {text : "Губки, перчатки и салфетки", action : () => router.push("/admin/catalog/section/sectionId")},
        {text : "Товары", action: () => {}}
    ]

    const handleExportCatalog = () => console.log("Exported")
    const handleProductClick = (product : AdminProduct) => console.log("PRODUCT", product)

    return {
        breadcrumbsData, handleExportCatalog, handleProductClick
    }

}