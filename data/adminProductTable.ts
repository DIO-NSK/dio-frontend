import {ProductTableRow, TableHeaderItem} from "@/types/dto/Table";
import {AdminProduct} from "@/types/dto/AdminProduct";
import AdminProductImage from "@/public/images/admin-product-image.png"

const adminProductTableHeader : TableHeaderItem[] = [
    {text : "Название", width : "col-span-5"},
    {text : "Скидка", width : "col-span-1"},
    {text : "На складе", width : "col-span-1"},
    {text : "Цена, шт.", width : "col-span-1"}
]

const adminProduct : AdminProduct = {
    image : AdminProductImage.src,
    name : "Многоразовые перчатки Мой Додыр 2 шт.",
    discount : 40,
    stockAmount : 152,
    price : 329
}

const adminProductTableContent : ProductTableRow[] = [
    {product : adminProduct},
    {product : adminProduct},
    {product : adminProduct},
    {product : adminProduct},
]

export {
    adminProductTableHeader,
    adminProductTableContent
}