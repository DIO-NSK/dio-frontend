"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {salesTableHeader} from "@/data/tables/adminSalesTable";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import React, {useEffect} from "react";
import {useUnit} from "effector-react";
import {$sales, getSalesEvent} from "@/app/admin/sales/model";

const AdminPanelSalesPage = () => {

    const [sales, getSales] = useUnit([$sales, getSalesEvent])

    const headerContext = useAdminPanelHeaderButtonRow()
    const editableContext = useAdminPanelHeaderRow()

    useEffect(() => {
        getSales()
    }, [])

    return (
        <React.Fragment>
            <AdminPanelHeaderButtonRow
                searchInputOnChange={headerContext.searchbar.setSearchValue}
                searchInputValue={headerContext.searchbar.searchValue}
                onAddNewItem={headerContext.handleAddItem}
            />
            <AdminPanelHeaderRow
                header={"Акции"}
                isEditable={editableContext.isEditable}
                onChange={editableContext.handleSwitchEditable}
                onSaveChanges={() => {}}
                onCancelChanges={() => {}}
            />
            <ProductContentTable
                isDraggable={editableContext.isEditable}
                tableHeader={salesTableHeader}
                tableContent={sales}
                onProductClick={(product) => console.log(product)}
                onDelete={(product) => console.log(product)}
                onEdit={(product) => console.log(product)}
            />
        </React.Fragment>
    );
};

export default AdminPanelSalesPage;
