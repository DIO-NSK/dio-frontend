"use client"

import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";
import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import AdminSectionPopup from "@/components/organisms/popups/admin/section/AdminSectionPopup";
import {useAdminPanelCatalogPage} from "@/app/admin/catalog/page.hooks";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import ChangeSectionNamePopup
    from "@/components/organisms/popups/admin/change-section-name-popup/ChangeSectionNamePopup";
import DeleteSectionPopup from "@/components/organisms/popups/admin/delete-section-popup/DeleteSectionPopup";
import React from "react";
import {useUnit} from "effector-react";
import {
    $sectionToDelete,
    $sectionToEdit,
    cancelChangesEvent,
    onCloseSectionToDeleteEvent,
    onCloseSectionToEditEvent,
    saveChangesEvent
} from "@/models/admin/section";

const AdminPanelCatalogPage = () => {

    const [
        saveChanges, cancelChanges,
        onCloseSectionToDelete,
        onCloseSectionToEdit,
        sectionToDelete,
        sectionToEdit
    ] = useUnit([
        saveChangesEvent, cancelChangesEvent,
        onCloseSectionToDeleteEvent, onCloseSectionToEditEvent,
        $sectionToDelete, $sectionToEdit
    ])

    const {...context} = useAdminPanelCatalogPage()
    const {...headerContext} = useAdminPanelHeaderButtonRow()
    const {...editableContext} = useAdminPanelHeaderRow()

    return (
        <>

            {
                sectionToEdit && <ChangeSectionNamePopup
                    onClose={onCloseSectionToEdit}
                    tableRow={sectionToEdit}
                />
            }
            {
                sectionToDelete && <DeleteSectionPopup
                    onClose={onCloseSectionToDelete}
                    tableRow={sectionToDelete}
                />
            }
            {
                context.popup.isPopupVisible && <AdminSectionPopup
                    placement={"center"}
                    onClose={context.popup.handleSwitchPopupState}
                />
            }

            <AdminPanelHeaderButtonRow
                searchInputOnChange={headerContext.searchbar.setSearchValue}
                searchInputValue={headerContext.searchbar.searchValue}
                onExportCatalog={context.handleExportCatalog}
                onAddNewItem={context.popup.handleSwitchPopupState}
            />

            <AdminPanelHeaderRow
                header={"Разделы"}
                isEditable={editableContext.isEditable}
                onChange={editableContext.handleSwitchEditable}
                onCancelChanges={cancelChanges}
                onSaveChanges={saveChanges}
            />

            <TextContentTable
                className={"mt-[-28px]"}
                tableContent={context.tableContent}
                isDraggable={editableContext.isEditable}
                onRowClick={context.handleRowClick}
            />

        </>
    );

};

export default AdminPanelCatalogPage;
