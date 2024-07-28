import {useRouter} from "next/navigation";
import {TableRow} from "@/types/dto/Table";
import {AdminOrder} from "@/types/dto/AdminOrder";

export const useAdminPanelAnalyticsPage = () => {

    const router = useRouter()

    const handleClickTableRow = (tableRow: TableRow<AdminOrder>) => console.log(tableRow)
    const handleViewAllOrders = () => router.push("/admin/orders")
    const handleGenerateFeed = () => console.log("Generate feed")
    const handleExportDatabase = () => console.log("Export database")

    return {
        handlers : {handleViewAllOrders, handleGenerateFeed, handleExportDatabase, handleClickTableRow}
    }

}