import {usePathname, useRouter} from "next/navigation";
import {TextTableRow} from "@/types/dto/Table";

export const useAdminPanelServicePage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const tableContent: TextTableRow[] = [
        {items: ["Аренда кулеров и пурифайеров"], itemsWidth : ["col-span-full"]},
        {items: ["Бесплатное пользование кулеров и стелажей"], itemsWidth : ["col-span-full"]},
        {items: ["Ремонт кулеров, пурифайеров и кофемашин"], itemsWidth : ["col-span-full"]},
        {items: ["Санитарная обработка кулеров и кофемашин"], itemsWidth : ["col-span-full"]},
        {items: ["Сервисное обслуживание пурифайеров"], itemsWidth : ["col-span-full"]},
    ]

    const handleRowClick = () => router.push(pathname.concat("/serviceId"))

    return {
        handleRowClick, table : {tableContent, handleRowClick}
    }

}