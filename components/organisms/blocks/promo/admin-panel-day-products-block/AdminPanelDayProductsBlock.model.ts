import {useUnit} from "effector-react";
import {
    $dayProducts,
    changeDayProductsOrderEvent,
    deleteDayProductEvent,
    getAllDayProductsEvent
} from "@/app/admin/promo/models/day_products.model";
import {useEffect} from "react";
import {ProductTableRow} from "@/types/dto/Table";
import {ProductEntity} from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {DragEndEvent} from "@dnd-kit/core";

export const useAdminPanelProductsBlock = () => {

    const [dayProducts, getDayProducts, deleteDayProduct, changeOrder]
        = useUnit([$dayProducts, getAllDayProductsEvent, deleteDayProductEvent, changeDayProductsOrderEvent])

    const tableContent = dayProducts.map(product => ({
        item: {
            image: product.image,
            name: product.name,
            discount: product.discountPercent,
            price: product.price
        },
        id: product.productDayId,
        itemsWidth: {
            image: "col-span-6",
            discount: "col-span-1",
            price: "col-span-1",
            name: ""
        },
        sequenceNumber: product.id
    }))

    useEffect(() => {
        getDayProducts()
    }, []);

    const handleChangeOrder = (event: DragEndEvent) => {
        changeOrder(event)
    }

    const handleDelete = (productRow: ProductTableRow<ProductEntity>) => {
        deleteDayProduct(productRow.id)
    }

    return {tableContent, handleDelete, changeOrder: handleChangeOrder}

}