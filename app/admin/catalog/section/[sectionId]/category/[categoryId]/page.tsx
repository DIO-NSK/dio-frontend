"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {
    ResponseAdminProductSearch,
    useAdminPanelProductsPage
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/page.hooks";
import ProductContentTable from "@/components/organisms/tables/product-content-table/ProductContentTable";
import {adminProductTableHeader} from "@/data/tables/adminProductTable";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import {useUnit} from "effector-react";
import {
    catalogProductPageDidMount,
    changeProductsOrderEvent, changeProductStateEvent, deleteProductEvent
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/model";
import React from "react";
import {ProductTableRow} from "@/types/dto/Table";

const AdminPanelProductsPage = ({params}: {
    params: {
        sectionId: number,
        categoryId: number
    }
}) => {

    const [changeOrder, deleteProducts, getProducts, changeProducts]
        = useUnit([changeProductsOrderEvent, deleteProductEvent, catalogProductPageDidMount, changeProductStateEvent])

    const {...context} = useAdminPanelProductsPage(params.categoryId)
    const {...headerContext} = useAdminPanelHeaderButtonRow()
    const {...editableContext} = useAdminPanelHeaderRow()

    return (
        <React.Fragment>

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
                        onSaveChanges={() => changeProducts(+params.categoryId)}
                        onCancelChanges={() => getProducts(+params.categoryId)}
                    />
                </div>

            </div>

            <ProductContentTable
                isDraggable={editableContext.isEditable}
                onDragEnd={changeOrder}
                tableHeader={adminProductTableHeader}
                tableContent={context.tableContent}
                onEdit={context.handleEditProduct}
                onDelete={(tableRow) => deleteProducts(tableRow.id)}
            />

        </React.Fragment>
    );
};

export default AdminPanelProductsPage;
