import {useRouter} from "next/navigation";
import {TextAction} from "@/types/dto/text";
import {AdminProduct} from "@/types/dto/AdminProduct";
import {useEffect} from "react";
import {useUnit} from "effector-react";
import {
    $products,
    catalogProductPageDidMount
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/model";
import {ProductTableRow} from "@/types/dto/Table";

export const useAdminPanelProductsPage = (categoryId: number) => {

    const [pageDidMount, products] = useUnit([catalogProductPageDidMount, $products])

    const router = useRouter()

    const breadcrumbsData: TextAction[] = [
        {text: "Бытовая химия и гигиена", action: () => router.push("/admin/catalog")},
        {text: "Губки, перчатки и салфетки", action: () => router.push("/admin/catalog/section/sectionId")},
        {
            text: "Товары", action: () => {
            }
        }
    ]

    const tableContent: ProductTableRow<AdminProduct>[] = products
        .map(product => ({
                item: {
                    image: product.images[0],
                    valueName: product.name,
                    discount: product.discountPercent,
                    stockAmount: product.availableCount,
                    price: product.price
                },
                id: product.id,
                itemsWidth: {
                    image: "col-span-5",
                    discount: "col-span-1",
                    stockAmount: "col-span-1",
                    price: "col-span-1",
                    valueName: ""
                }
            })
        )

    useEffect(() => {
        pageDidMount(categoryId)
    }, [pageDidMount])

    const handleExportCatalog = () => console.log("Exported")
    const handleProductClick = (product: AdminProduct) => console.log("PRODUCT", product)

    return {
        breadcrumbsData, handleExportCatalog, handleProductClick,
        tableContent
    }

}