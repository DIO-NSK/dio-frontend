"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelSaveDiscardChangesRow
    from "@/components/organisms/rows/admin-panel-save-discard-changes-row/AdminPanelSaveDiscardChangesRow";
import {useAdminPanelSalePage} from "@/app/admin/sales/[saleId]/page.hooks";

const AdminPanelSalePage = ({params}: {
    params: {
        saleId: number
    }
}) => {

    const {...context} = useAdminPanelSalePage(params.saleId)

    return (
        <>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Вода «Горная Вершина» в подарок"}
                hasBackIcon
            />
        </>
    );

};

export default AdminPanelSalePage;
