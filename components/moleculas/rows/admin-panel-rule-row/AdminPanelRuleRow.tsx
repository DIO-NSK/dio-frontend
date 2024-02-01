import React from 'react';
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";

type AdminPanelRuleRowProps = {
    value: string,
    onChange: (value: string) => void,
    onDelete: () => void
}

const AdminPanelRuleRow = (props: AdminPanelRuleRowProps) => {
    return (
        <DraggableRowWrapper {...props}>
            <TextInput placeholder={"Введите правило"} {...props}/>
        </DraggableRowWrapper>
    );
};

export default AdminPanelRuleRow;
