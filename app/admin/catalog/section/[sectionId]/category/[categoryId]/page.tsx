"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {useAdminPanelProductsPage} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {adminProductTableHeader} from "@/data/tables/adminProductTable";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";

const AdminPanelProductsPage = ({params}: {
    params: {
        sectionId: number,
        categoryId: number
    }
}) => {

    const {...context} = useAdminPanelProductsPage(params.categoryId)
    const {...headerContext} = useAdminPanelHeaderButtonRow()
    const {...editableContext} = useAdminPanelHeaderRow()

    return (
        <>

            <div className={"w-full flex flex-col gap-4"}>

                <AdminPanelHeaderButtonRow
                    onExportCatalog={context.handleExportCatalog}
                    onAddNewItem={headerContext.handleAddItem}
                    searchInputValue={headerContext.searchbar.searchValue}
                    searchInputOnChange={headerContext.searchbar.setSearchValue}
                />

                <div className={"w-full flex flex-col"}>
                    <CatalogBreadcrumbs breadcrumbs={context.breadcrumbs}/>
                    <AdminPanelHeaderRow
                        header={"Товары"}
                        isEditable={editableContext.isEditable}
                        onChange={editableContext.handleSwitchEditable}
                        onSaveChanges={() => console.log("AA")}
                        onCancelChanges={() => console.log("BB")}
                    />
                </div>

            </div>

            <ProductContentTable
                isDraggable={editableContext.isEditable}
                tableHeader={adminProductTableHeader}
                tableContent={context.tableContent}
                onProductClick={context.handleProductClick}
                onEdit={context.handleEditProduct}
                onDelete={context.handleDeleteProduct}
            />

        </>
    );
};

export default AdminPanelProductsPage;
