import React, { useState } from 'react';
import { TableItemPopup } from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import { useUnit } from "effector-react";
import { editSectionEvent, onCloseSectionToEditEvent } from "@/app/admin/catalog/model";

const ChangeSectionNamePopup = (props: TableItemPopup<string[]>) => {

    const [editSection, onCloseSectionToEdit] = useUnit([editSectionEvent, onCloseSectionToEditEvent])

    const [sectionName, setSectionName] = useState<string>("")

    const handleSubmit = () => {
        // editSection({sectionId: props.tableRow.id, newName: sectionName as any})
        onCloseSectionToEdit()
    }

    return (
        <PopupWrapper placement={"center"} {...props}>
            <div className={"w-[400px] flex flex-col gap-5"}>
                <Text text={"Изменить название"} className={"text-[20px] font-medium"} />
                <Text text={"Будьте осторожны, новое название применится ко всем разделам сайта"}
                    className={"text-text-gray"} />
                <TextInput
                    labelText={"Название раздела"}
                    placeholder={props.tableRow.item[0]}
                    value={sectionName}
                    onChange={setSectionName}
                />
                <Button
                    text={"Подтвердить"}
                    onClick={handleSubmit}
                />
            </div>
        </PopupWrapper>
    );

};

export default ChangeSectionNamePopup;
