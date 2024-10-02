import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useUnit} from "effector-react";
import {
    $products,
    catalogProductPageDidMount
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/model";
import {ProductTableRow} from "@/types/dto/Table";
import {
    $adminProductBreadcrumbs
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productUrlMask]/model";
import {getAdminProductBreadcrumbsEvent} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryUrlMask]/model";
import {ProductEntity} from "@/components/organisms/tables/product-content-table/ProductContentTable";

export type ResponseAdminProductSearch = {
    image: string,
    name: string,
    discount: number,
    stockAmount: number,
    price: number,
}

export const useAdminPanelProductsPage = (categoryId: number) => {

    const [nameToSearch, setNameToSearch] = useState<string>('')
    const [breadcrumbs, getBreadcrumbs] = useUnit([$adminProductBreadcrumbs, getAdminProductBreadcrumbsEvent])
    const [pageDidMount, products] = useUnit([catalogProductPageDidMount, $products])

    const pathname = usePathname()
    const router = useRouter()

    const tableContent: ProductTableRow<ResponseAdminProductSearch>[] = products
        ?.filter(product => product.name.toLowerCase().includes(nameToSearch.toLowerCase()))
        .map((product, index) => ({
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
                },
                sequenceNumber: product.sequenceNumber
            })
        )

    useEffect(() => {
        getBreadcrumbs(categoryId)
        pageDidMount(categoryId)
    }, [])

    const handleExportCatalog = () => console.log("Exported")

    const handleProductClick = (tableRow: ProductTableRow<ProductEntity>) =>
        router.push(pathname.concat(`/product/${tableRow.id}`))

    const handleEditProduct = (tableRow: ProductTableRow<ProductEntity>) =>
        router.push(pathname.concat(`/product/${tableRow.id}/edit`))

    const handleDeleteProduct = (tableRow: ProductTableRow<ProductEntity>) => console.log("Product deleted")

    return {
        nameToSearch, setNameToSearch,
        breadcrumbs, handleExportCatalog, handleProductClick,
        tableContent, handleEditProduct, handleDeleteProduct
    }

}