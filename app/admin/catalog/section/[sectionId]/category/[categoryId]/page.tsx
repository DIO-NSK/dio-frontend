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
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import {useUnit} from "effector-react";
import {
    $isProductsEditable,
    catalogProductPageDidMount,
    changeProductsOrderEvent,
    changeProductStateEvent,
    deleteProductEvent,
    toggleEditableEvent
} from "@/app/admin/catalog/section/[sectionId]/category/[categoryId]/model";
import React from "react";

const AdminPanelProductsPage = ({params}: {
    params: {
        sectionId: number,
        categoryId: number
    }
}) => {

    const [changeOrder, deleteProducts, getProducts, changeProducts]
        = useUnit([changeProductsOrderEvent, deleteProductEvent, catalogProductPageDidMount, changeProductStateEvent])

    const [isEditable, toggleEditable] = useUnit([$isProductsEditable, toggleEditableEvent])
    const {...context} = useAdminPanelProductsPage(params.categoryId)
    const {...headerContext} = useAdminPanelHeaderButtonRow()

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
                    <div className={"w-full px-7"}>
                        <CatalogBreadcrumbs breadcrumbs={context.breadcrumbs}/>
                    </div>
                    <AdminPanelHeaderRow
                        header={"Товары"}
                        isEditable={isEditable}
                        onChange={toggleEditable}
                        onSaveChanges={() => changeProducts(+params.categoryId)}
                        onCancelChanges={() => getProducts(+params.categoryId)}
                    />
                </div>
            </div>
            <ProductContentTable
                isDraggable={isEditable}
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
