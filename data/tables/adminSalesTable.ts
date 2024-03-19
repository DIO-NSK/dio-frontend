import {ProductTableRow, TableHeaderItem} from "@/types/dto/Table";
import AdminSaleImage from "@/public/images/admin-sale-image.png"
import {AdminSale} from "@/types/dto/AdminSale";

const salesTableHeader: TableHeaderItem[] = [
    {text: "Название", width: "col-span-6"},
    {text: "Скидка", width: "col-span-1"},
    {text: "На складе", width: "col-span-1"}
]

const salesTableItem: ProductTableRow<AdminSale> = {
    id: 1,
    item: {
        image: AdminSaleImage.src,
        name: "Вода «Горная Вершина» в подарок",
        discount: 12,
        stockAmount: 20
    },
    itemsWidth: {
        price: "col-span-1",
        image: "col-span-6",
        discount: "col-span-1",
        stockAmount: "col-span-1",
        name: ""
    }
}

const salesTableContent: ProductTableRow<AdminSale>[] = [
    salesTableItem, salesTableItem, salesTableItem
]

export {
    salesTableHeader,
    salesTableContent
}