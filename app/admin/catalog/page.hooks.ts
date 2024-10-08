import { TextTableRow } from "@/types/dto/Table";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUnit } from "effector-react";
import { $nameToSearch, $sections, pageDidMountEvent } from "./model";

export const useAdminPanelCatalogPage = () => {

    const [
        sections,
        nameToSearch,
        pageDidMount
    ] = useUnit([$sections, $nameToSearch, pageDidMountEvent])

    const router = useRouter()
    const pathname = usePathname()

    const tableContent: TextTableRow[] = sections
        ?.filter(section => section.name.toLowerCase().includes(nameToSearch.toLowerCase()))
        .map(section => ({
            id: +section.id!!,
            sequenceNumber: section.sequenceNumber,
            item: [section.name],
            itemsWidth: ["col-span-full"]
        })
        )

    const [
        isPopupVisible,
        setPopupVisible
    ] = useState<boolean>(false)

    const handleExportCatalog = () => console.log("Exported")
    const handleSwitchPopupState = () => setPopupVisible(!isPopupVisible)
    const handleRowClick = (id: number) => router.push(pathname.concat(`/section/${id}`))

    const handleAddNewSection = () : void => router.push(pathname.concat('/new'))
    const handleEditSection = (sectionId: number) => router.push(pathname.concat(`/edit/${sectionId}`))

    useEffect(() => {
        pageDidMount()
    }, [pageDidMount])

    return {
        tableContent,
        popup: { handleSwitchPopupState, isPopupVisible },
        handleExportCatalog, handleRowClick, handleAddNewSection, handleEditSection
    }

}