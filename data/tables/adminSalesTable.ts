import {ProductTableRow, TableHeaderItem} from "@/types/dto/Table";
import AdminSaleImage from "@/public/images/admin-sale-image.png"
import {AdminSale} from "@/types/dto/AdminSale";
import {ResponseAdminProductSearch} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";

export const salesTableHeader: TableHeaderItem[] = [
    {text: "Название", width: "col-span-4"},
    {text: "Скидка", width: "col-span-1"},
]