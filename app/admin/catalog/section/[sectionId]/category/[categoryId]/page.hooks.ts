import {usePathname, useRouter} from "next/navigation";
import {TextAction} from "@/types/dto/text";
import {useEffect} from "react";
import {useUnit} from "effector-react";
import {
    $products,
    catalogProductPageDidMount
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/model";
import {ProductTableRow} from "@/types/dto/Table";

export type ResponseAdminProductSearch = {
    image: string,
    name: string,
    discount: number,
    stockAmount: number,
    price: number
}

export const useAdminPanelProductsPage = (categoryId: number) => {

    const [pageDidMount, products] = useUnit([catalogProductPageDidMount, $products])

    const pathname = usePathname()
    const router = useRouter()

    const breadcrumbsData: TextAction[] = [
        {text: "Бытовая химия и гигиена", action: () => router.push("/admin/catalog")},
        {text: "Губки, перчатки и салфетки", action: () => router.push("/admin/catalog/section/sectionId")},
        {
            text: "Товары", action: () => {
            }
        }
    ]

    const tableContent: ProductTableRow<ResponseAdminProductSearch>[] = products
        .map(product => ({
                item: {
                    image: product.images[0],
                    name: product.name,
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
                    name: ""
                }
            })
        )

    useEffect(() => {
        pageDidMount(categoryId)
    }, [pageDidMount])

    const handleExportCatalog = () => console.log("Exported")

    const handleProductClick = (tableRow: ProductTableRow<ResponseAdminProductSearch>) =>
        router.push(pathname.concat(`/product/${tableRow.id}`))

    const handleEditProduct = (tableRow: ProductTableRow<ResponseAdminProductSearch>) =>
        router.push(pathname.concat(`/product/${tableRow.id}/edit`))

    const handleDeleteProduct = (tableRow: ProductTableRow<ResponseAdminProductSearch>) => console.log("Product deleted")

    return {
        breadcrumbsData, handleExportCatalog, handleProductClick,
        tableContent, handleEditProduct, handleDeleteProduct
    }

}