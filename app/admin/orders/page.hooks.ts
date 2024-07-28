import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {AdminOrder} from "@/types/dto/AdminOrder";
import {TableRow} from "@/types/dto/Table";
import {SelectItem} from "@/types/props/SelectItem";
import {useUnit} from "effector-react";
import {$savedFilters, filterOrdersEvent} from "@/components/organisms/popups/admin/order-page-filter-popup/model";

export const useAdminPanelOrdersPage = () => {

    const [savedFilters, filterOrders] = useUnit([$savedFilters, filterOrdersEvent]);

    const router = useRouter()
    const pathname = usePathname()

    const handleRowClick = (tableRow: TableRow<AdminOrder>) => router.push(pathname.concat(`/${tableRow.id}`))

    const multiselectData: SelectItem<string | undefined>[] = [
        {name: "Все", value: undefined},
        {name: "Черновик", value: "DRAFT"},
        {name: "В ожидании", value: "PENDING"},
        {name: "В обработке", value: "ACTIVE"},
        {name: "Выполнен", value: "COMPLETED"},
        {name: "Отменен", value: "CANCELED"},
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectItem<string | undefined>>(multiselectData[0])

    useEffect(() => {
        filterOrders({...savedFilters, status: activeItem as any});
    }, [activeItem]);

    return {
        multiselectButton: {multiselectData, activeItem, setActiveItem},
        handleRowClick
    }

}