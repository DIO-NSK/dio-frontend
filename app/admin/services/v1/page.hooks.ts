import {usePathname, useRouter} from "next/navigation";
import {TextTableRow} from "@/types/dto/Table";

export const useAdminPanelServicePage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const tableContent: TextTableRow[] = [
        {id: 1, item: ["Аренда кулеров и пурифайеров"], itemsWidth: ["col-span-full"]},
        {id: 2, item: ["Бесплатное пользование кулеров и стелажей"], itemsWidth: ["col-span-full"]},
        {id: 3, item: ["Ремонт кулеров, пурифайеров и кофемашин"], itemsWidth: ["col-span-full"]},
        {id: 4, item: ["Санитарная обработка кулеров и кофемашин"], itemsWidth: ["col-span-full"]},
        {id: 5, item: ["Сервисное обслуживание пурифайеров"], itemsWidth: ["col-span-full"]},
    ]

    const handleRowClick = () => router.push(pathname.concat("/serviceId"))

    return {
        handleRowClick, table: {tableContent, handleRowClick}
    }

}