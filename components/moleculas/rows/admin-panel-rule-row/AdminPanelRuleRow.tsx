import React from 'react';
import DraggableRowWrapper from "@/components/wrappers/draggable-row-wrapper/DraggableRowWrapper";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {FieldValues, Path} from "react-hook-form";

type AdminPanelRuleRowProps<T extends FieldValues> = {
    name: Path<T>,
    onDelete: () => void
}

const AdminPanelRuleRow = <T extends FieldValues, >(props: AdminPanelRuleRowProps<T>) => {
    return (
        <DraggableRowWrapper className={"w-full"} onDelete={props.onDelete}>
            <ControlledTextInput placeholder={"Введите правило"} name={props.name}/>
        </DraggableRowWrapper>
    );
};

export default AdminPanelRuleRow;
