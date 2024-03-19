"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {useAdminPanelSalesPage} from "@/app/admin/sales/page.hooks";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {salesTableContent, salesTableHeader} from "@/data/tables/adminSalesTable";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import React from "react";

const AdminPanelSalesPage = () => {

    const {...context} = useAdminPanelSalesPage()
    const {...headerContext} = useAdminPanelHeaderButtonRow()
    const {...editableContext} = useAdminPanelHeaderRow()

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
                tableHeader={salesTableHeader}
                tableContent={salesTableContent}
                onProductClick={context.handleProductClick}
                onDelete={() => {}}
                onEdit={() => {}}
            />
        </React.Fragment>
    );
};

export default AdminPanelSalesPage;
