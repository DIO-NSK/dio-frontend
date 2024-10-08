"use client"

import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";
import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import AdminSectionPopup from "@/components/organisms/popups/admin/section/AdminSectionPopup";
import { useAdminPanelCatalogPage } from "@/app/admin/catalog/page.hooks";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import { useAdminPanelHeaderRow } from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import ChangeSectionNamePopup
    from "@/components/organisms/popups/admin/change-section-name-popup/ChangeSectionNamePopup";
import DeletePopup from "@/components/organisms/popups/admin/delete-popup/DeletePopup";
import React from "react";
import { useUnit } from "effector-react";
import {
    $sectionToDelete,
    $sectionToEdit,
    cancelChangesEvent, changeOrderEvent,
    deleteSectionEvent,
    onCloseSectionToDeleteEvent,
    onCloseSectionToEditEvent,
    saveChangesEvent,
    selectSectionToDeleteEvent,
    selectSectionToEditEvent
} from "./model";

const AdminPanelCatalogPage = () => {

    const [
        saveChanges, cancelChanges,
        selectSectionToDelete, selectSectionToEdit,
        changeOrder
    ] = useUnit([
        saveChangesEvent, cancelChangesEvent,
        selectSectionToDeleteEvent, selectSectionToEditEvent,
        changeOrderEvent
    ])

    const { ...context } = useAdminPanelCatalogPage()
    const { ...headerContext } = useAdminPanelHeaderButtonRow()
    const { ...editableContext } = useAdminPanelHeaderRow()

    return (
        <React.Fragment>
            <EditSectionPopup />
            <DeleteSectionPopup />
            {context.popup.isPopupVisible && <AdminSectionPopup
                placement={"center"}
                onClose={context.popup.handleSwitchPopupState}
            />}
            <AdminPanelHeaderButtonRow
                searchInputOnChange={headerContext.searchbar.setSearchValue}
                searchInputValue={headerContext.searchbar.searchValue}
                onExportCatalog={context.handleExportCatalog}
                onAddNewItem={context.handleAddNewSection}
            />
            <AdminPanelHeaderRow
                header={"Разделы"}
                isEditable={editableContext.isEditable}
                onChange={editableContext.handleSwitchEditable}
                onCancelChanges={cancelChanges}
                onSaveChanges={saveChanges}
            />
            {context.tableContent && <TextContentTable
                classNames={{ content: "-mt-7" }}
                tableContent={context.tableContent}
                isDraggable={editableContext.isEditable}
                onDragEnd={changeOrder}
                onRowClick={(rowIndex) => !editableContext.isEditable && context.handleRowClick(rowIndex)}
                onEdit={(tableRow) => context.handleEditSection(tableRow.id)}
                onDelete={selectSectionToDelete}
            />}
        </React.Fragment>
    );

};

const EditSectionPopup = () => {

    const [
        sectionToEdit, onCloseSectionToEdit
    ] = useUnit([$sectionToEdit, onCloseSectionToEditEvent])

    return sectionToEdit && <ChangeSectionNamePopup
        onClose={onCloseSectionToEdit}
        tableRow={sectionToEdit}
    />

}

const DeleteSectionPopup = () => {

    const [
        sectionToDelete, onCloseSectionToDelete,
        deleteSection,
    ] = useUnit([$sectionToDelete, onCloseSectionToDeleteEvent, deleteSectionEvent])

    return sectionToDelete && <DeletePopup
        onDelete={deleteSection}
        onClose={onCloseSectionToDelete}
        tableRow={sectionToDelete}
    />

}

export default AdminPanelCatalogPage;
