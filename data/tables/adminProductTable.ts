import {ProductTableRow, TableHeaderItem} from "@/types/dto/Table";
import {AdminProduct} from "@/types/dto/AdminProduct";
import AdminProductImage from "@/public/images/admin-product-image.png"

const adminProductTableHeader: TableHeaderItem[] = [
    {text: "Название", width: "col-span-5"},
    {text: "Скидка", width: "col-span-1"},
    {text: "На складе", width: "col-span-1"},
    {text: "Цена, шт.", width: "col-span-1"}
]

export const mockAdminProduct : AdminProduct = {
    image: AdminProductImage.src,
    name: "Многоразовые перчатки Мой Додыр 2 шт.",
    discount: 40,
    stockAmount: 152,
    price: 329
}

export const adminProductRow: ProductTableRow<AdminProduct> = {
    item: mockAdminProduct,
    itemsWidth: {
        image: "col-span-5",
        discount: "col-span-1",
        stockAmount: "col-span-1",
        price: "col-span-1",
        name: ""
    }
}

const adminProductTableContent: ProductTableRow<AdminProduct>[] = [
    adminProductRow, adminProductRow, adminProductRow, adminProductRow
]

export {
    adminProductTableHeader,
    adminProductTableContent
}