"use client"

import {useAdminPanelServicePage} from "@/app/admin/services/page.hooks";
import AdminPanelHeaderButtonRow
    from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow";
import {
    useAdminPanelHeaderButtonRow
} from "@/components/organisms/rows/admin-panel-header-button-row/AdminPanelHeaderButtonRow.hooks";
import {useAdminPanelHeaderRow} from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow.hooks";
import AdminPanelHeaderRow from "@/components/organisms/rows/admin-panel-header-row/AdminPanelHeaderRow";
import TextContentTable from "@/components/organisms/tables/text-content-table/TextContentTable";

const AdminPanelServicePage = () => {

    const {...context} = useAdminPanelServicePage()
    const {...headerContext} = useAdminPanelHeaderButtonRow()
    const {...editableContext} = useAdminPanelHeaderRow()

    return (
        <>
            <AdminPanelHeaderButtonRow
                searchInputOnChange={headerContext.searchbar.setSearchValue}
                searchInputValue={headerContext.searchbar.searchValue}
                onAddNewItem={headerContext.handleAddItem}
            />

            <AdminPanelHeaderRow
                header={"Услуги"}
                isEditable={editableContext.isEditable}
                onChange={editableContext.handleSwitchEditable}
                onSaveChanges={() => {}}
                onCancelChanges={() => {}}
            />

            <TextContentTable
                className={"mt-[-28px]"}
                tableContent={context.table.tableContent}
                isDraggable={editableContext.isEditable}
                onRowClick={context.handleRowClick}
            />

        </>
    );

};

export default AdminPanelServicePage;
