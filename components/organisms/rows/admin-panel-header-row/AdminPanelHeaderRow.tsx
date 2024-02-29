import React from 'react';
import AdminPanelSaveDiscardChangesRow
    from "@/components/organisms/rows/admin-panel-save-discard-changes-row/AdminPanelSaveDiscardChangesRow";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";

type AdminPanelHeaderRowProps = {
    header: string,
    isEditable: boolean,
    onChange : () => void,
    onSaveChanges: () => void,
    onCancelChanges : () => void
}

const AdminPanelHeaderRow = (props: AdminPanelHeaderRowProps) => {
    return (
        <HeaderRow
            rightContent={<AdminPanelSaveDiscardChangesRow {...props}/>}
            className={"w-full"}
            theme={"bordered"}
            header={props.header}
        />
    );
};

export default AdminPanelHeaderRow;
