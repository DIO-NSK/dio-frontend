"use client"

import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {useAdminPanelCategoriesPage} from "@/app/admin/catalog/section/[sectionId]/page.hooks";
import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";
import {Breadcrumbs, Link} from "@mui/joy";
import Text from "@/components/atoms/text/text-base/Text";
import {useRouter} from "next/navigation";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import {useUnit} from "effector-react";
import {
    $categoryToDelete, cancelChangesEvent, deleteCategoryEvent,
    onCloseCategoryToDeleteEvent, saveChangesEvent,
    selectCategoryToDeleteEvent
} from "@/app/admin/catalog/section/[sectionId]/model";
import DeletePopup from "@/components/organisms/popups/admin/delete-popup/DeletePopup";

const deletePopupMessage =
    `Предупреждаем, это действие невозможно отменить
     и товары данной категории удалятся без возможности восстановления`

const AdminPanelCategoryPage = ({params}: {
    params: { sectionId: number }
}) => {

    const selectCategoryToDelete = useUnit(selectCategoryToDeleteEvent)
    const [saveChanges, cancelChanges] = useUnit([saveChangesEvent, cancelChangesEvent])

    const context = useAdminPanelCategoriesPage(params.sectionId)
    const headerContext = useAdminPanelHeaderButtonRow()
    const editableContext = useAdminPanelHeaderRow()

    const router = useRouter()

    return (
        <>
            <DeleteCategoryPopup/>
            <div className={"w-full flex flex-col gap-4"}>
                <AdminPanelHeaderButtonRow
                    onExportCatalog={context.handleExportCatalog}
                    onAddNewItem={headerContext.handleAddItem}
                    searchInputValue={headerContext.searchbar.searchValue}
                    searchInputOnChange={headerContext.searchbar.setSearchValue}
                />

                <div className={"w-full flex flex-col"}>
                    <Breadcrumbs
                        sx={{
                            "--Breadcrumbs-gap": "10px",
                            marginLeft: "-10px",
                            marginBottom: "-10px"
                        }}
                    >
                        <Link color={"neutral"} onClick={() => router.push('/admin/catalog')}>
                            <Text text={"Бытовая химия и гигиена"} className={"text-text-gray"}/>
                        </Link>
                        <Text text={"Категории"}/>
                    </Breadcrumbs>
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
                classNames={{content : "mt-[-28px]"}}
                tableContent={context.tableContent}
                isDraggable={editableContext.isEditable}
                onRowClick={context.handleRowClick}
                onDelete={selectCategoryToDelete}
                onEdit={context.handleEditCategory}
            />

        </>
    );

};

const DeleteCategoryPopup = () => {

    const [categoryToDelete, onCloseCategoryToDelete, deleteCategory] =
        useUnit([$categoryToDelete, onCloseCategoryToDeleteEvent, deleteCategoryEvent])

    return categoryToDelete && <DeletePopup
        header={"Удалить категорию"}
        message={deletePopupMessage}
        onClose={onCloseCategoryToDelete}
        tableRow={categoryToDelete}
        onDelete={deleteCategory}
    />

}

export default AdminPanelCategoryPage;
