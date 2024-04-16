import {ProductTableRow, TableHeaderItem} from "@/types/dto/Table";
import AdminSaleImage from "@/public/images/admin-sale-image.png"
import {AdminSale} from "@/types/dto/AdminSale";
import {ResponseAdminProductSearch} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";

const salesTableHeader: TableHeaderItem[] = [
    {text: "Название", width: "col-span-6"},
    {text: "Скидка", width: "col-span-1"},
    {text: "На складе", width: "col-span-1"}
]

const salesTableContent: ProductTableRow<ResponseAdminProductSearch>[] = []

export {
    salesTableHeader,
    salesTableContent
}