import React from 'react';
import Button from "@/components/atoms/buttons/button/Button";

const AdminPanelSaveDiscardChangesRow = ({isEditable, onChange}: {
    isEditable: boolean,
    onChange: () => void
}) => {
    return (
        <>
            {
                isEditable ? <div className={"flex flex-row gap-3"}>
                    <Button
                        text={"Сохранить изменения"}
                        onClick={onChange}
                        buttonType={"SECONDARY"} size={"sm"}
                    />
                    <Button
                        text={"Отменить"}
                        onClick={onChange}
                        buttonType={"SECONDARY"} size={"sm"}
                        classNames={{button: "bg-bg-light-blue hover:bg-gray-100 text-text-gray"}}
                    />
                </div> : <Button
                    text={"Редактировать"}
                    onClick={onChange}
                    buttonType={"SECONDARY"}
                    size={"sm"}
                />
            }
        </>
    )
}

export default AdminPanelSaveDiscardChangesRow;
