import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {TableRow} from "@/types/dto/Table";
import {SelectItem} from "@/types/props/SelectItem";

export const useAdminPanelOrdersPage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const handleRowClick = (tableRow: TableRow<AdminOrder>) => router.push(pathname.concat(`/${tableRow.id}`))

    const multiselectData: SelectItem<string>[] = [
        {name: "Все", value: "Все"},
        {name: "Активные", value: "Активные"},
        {name: "Принятые", value: "Принятые"},
        {name: "Отмеченные", value: "Отмеченные"}
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectItem<string>>(multiselectData[0])

    return {
        multiselectButton: {multiselectData, activeItem, setActiveItem},
        handleRowClick
    }

}