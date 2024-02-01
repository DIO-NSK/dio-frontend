"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import AdminPanelSaveDiscardChangesRow
    from "@/components/organisms/rows/admin-panel-save-discard-changes-row/AdminPanelSaveDiscardChangesRow";
import {useAdminPanelSalesPage} from "@/app/admin/sales/page.hooks";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {salesTableContent, salesTableHeader} from "@/data/tables/adminSalesTable";

const AdminPanelSalesPage = () => {

    const {...context} = useAdminPanelSalesPage()

    return (
        <>
            <AdminPanelHeaderButtonRow
                searchInputOnChange={context.searchbar.setSearchValue}
                searchInputValue={context.searchbar.searchValue}
                onAddNewItem={context.handleAddSale}
            />

            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Акции"}
                rightContent={
                    <AdminPanelSaveDiscardChangesRow
                        isEditable={context.editMode.isEditable}
                        onChange={context.editMode.handleSwitchEditable}
                    />
                }
            />

            <ProductContentTable
                tableHeader={salesTableHeader}
                tableContent={salesTableContent}
                onProductClick={context.handleProductClick}
            />

        </>
    );
};

export default AdminPanelSalesPage;
