"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";
import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import AdminSectionPopup from "@/components/organisms/popups/admin/section/AdminSectionPopup";
import {useAdminPanelCatalogPage} from "@/app/admin/catalog/page.hooks";
import AdminPanelSaveDiscardChangesRow
    from "@/components/organisms/rows/admin-panel-save-discard-changes-row/AdminPanelSaveDiscardChangesRow";

const AdminPanelCatalogPage = () => {

    const {...context} = useAdminPanelCatalogPage()

    return (
        <>

            {
                context.popup.isPopupVisible && <AdminSectionPopup
                    placement={"center"}
                    onClose={context.popup.handleSwitchPopupState}
                />
            }

            <AdminPanelHeaderButtonRow
                searchInputOnChange={context.searchbar.setSearchValue}
                searchInputValue={context.searchbar.searchValue}
                onExportCatalog={context.handleExportCatalog}
                onAddNewItem={context.popup.handleSwitchPopupState}
            />

            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Разделы"}
                rightContent={
                    <AdminPanelSaveDiscardChangesRow
                        isEditable={context.editMode.isEditable}
                        onChange={context.editMode.handleSwitchEditable}
                    />
                }
            />

            <TextContentTable
                className={"mt-[-28px]"}
                tableContent={context.tableContent}
                isDraggable={context.editMode.isEditable}
            />

        </>
    );

};

export default AdminPanelCatalogPage;
