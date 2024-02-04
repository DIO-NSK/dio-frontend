import {AdminOrder} from "@/types/dto/AdminOrder";
import {adminOrderTableItem} from "@/data/tables/adminOrdersTable";

export const useAdminPanelOrderPage = () => {

    const mockOrder : AdminOrder = adminOrderTableItem

    return {
        mockOrder
    }

}