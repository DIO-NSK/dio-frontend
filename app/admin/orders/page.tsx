"use client"

import AdminPanelOrderHeader from "@/components/organisms/rows/admin-panel-order-header/AdminPanelOrderHeader";
import React from "react";
import OrderContentTable from "@/components/organisms/tables/order-content-table/OrderContentTable";
import {adminOrdersTableHeader, adminOrderTableContent} from "@/data/tables/adminOrdersTable";
import {useSelectable} from "@/utlis/hooks/useSelectable";
import {AdminOrder} from "@/types/dto/AdminOrder";

const AdminPanelOrderPage = () => {

    const defaultItems = adminOrderTableContent.map(i => i.item)
    const {...selectableContext} = useSelectable<AdminOrder>(defaultItems)

    return (
        <>
            <AdminPanelOrderHeader/>
            <OrderContentTable
                tableHeader={adminOrdersTableHeader}
                tableContent={adminOrderTableContent}
                onSelect={selectableContext.handleSelectItem}
                selectedItems={selectableContext.selectedItems}
            />
        </>
    );

};

export default AdminPanelOrderPage;
