import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {TableRow} from "@/types/dto/Table";

export const useAdminPanelOrdersPage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const handleRowClick = (tableRow : TableRow<AdminOrder>) => router.push(pathname.concat("/orderId"))

    const multiselectData : string[] = [
        "Все", "Активные", "Принятые", "Отмеченные"
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<string>(multiselectData[0])

    return {
        multiselectButton : {multiselectData, activeItem, setActiveItem},
        handleRowClick
    }

}