"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {useAdminPanelCategoriesPage} from "@/app/admin/catalog/section/[sectionId]/page.hooks";
import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import {useUnit} from "effector-react";
import {
    $categoryToDelete,
    cancelChangesEvent, changeCategoryOrderEvent,
    deleteCategoryEvent,
    onCloseCategoryToDeleteEvent,
    saveChangesEvent,
    selectCategoryToDeleteEvent
} from "@/app/admin/catalog/section/[sectionId]/model";
import DeletePopup from "@/components/organisms/popups/admin/delete-popup/DeletePopup";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import React from "react";

const deletePopupMessage =
    `Предупреждаем, это действие невозможно отменить
     и товары данной категории удалятся без возможности восстановления`

const AdminPanelCategoryPage = ({params}: {
    params: { sectionId: number }
}) => {

    const [selectCategoryToDelete, changeOrder] = useUnit([selectCategoryToDeleteEvent, changeCategoryOrderEvent])
    const [saveChanges, cancelChanges] = useUnit([saveChangesEvent, cancelChangesEvent])

    const context = useAdminPanelCategoriesPage(params.sectionId)
    const headerContext = useAdminPanelHeaderButtonRow()
    const editableContext = useAdminPanelHeaderRow()

    return (
        <React.Fragment>
            <DeleteCategoryPopup/>
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
                        header={"Категории"}
                        isEditable={editableContext.isEditable}
                        onChange={editableContext.handleSwitchEditable}
                        onSaveChanges={saveChanges}
                        onCancelChanges={cancelChanges}
                    />
                </div>

            </div>

            <TextContentTable
                classNames={{content: "mt-[-28px]"}}
                tableContent={context.tableContent}
                onDragEnd={changeOrder}
                isDraggable={editableContext.isEditable}
                onRowClick={(rowIndex) => !editableContext.isEditable && context.handleRowClick(rowIndex)}
                onDelete={selectCategoryToDelete}
                onEdit={context.handleEditCategory}
            />

        </React.Fragment>
    );

};

const DeleteCategoryPopup = () => {

    const [categoryToDelete, onCloseCategoryToDelete, deleteCategory] =
        useUnit([$categoryToDelete, onCloseCategoryToDeleteEvent, deleteCategoryEvent])

    const handleDeleteCategory = (categoryId : number) => {
        deleteCategory(categoryId)
    }

    return categoryToDelete && <DeletePopup
        header={"Удалить категорию"}
        message={deletePopupMessage}
        tableRow={categoryToDelete}
        onClose={onCloseCategoryToDelete}
        onDelete={handleDeleteCategory}
    />

}

export default AdminPanelCategoryPage;
