import React, {useEffect, useState} from 'react';
import {TableItemPopup} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {$sectionToDelete, deleteSectionEvent, onCloseSectionToDeleteEvent} from "@/app/admin/catalog/model";

const DeleteSectionPopup = (props: TableItemPopup<string[]>) => {

    const [sectionName, setSectionName] = useState<string>("")

    useEffect(() => {
        console.log(sectionName)
    }, [sectionName])

    const [
        sectionToDelete,
        deleteSection,
        onCloseSectionToDelete
    ] = useUnit([
        $sectionToDelete,
        deleteSectionEvent,
        onCloseSectionToDeleteEvent
    ])

    const onDeleteCategory = () => {
        if (sectionName === sectionToDelete?.item[0]) {
            deleteSection(props.tableRow.id)
            onCloseSectionToDelete()
        }
    }

    return (
        <PopupWrapper placement={"center"} {...props}>
            <div className={"w-[500px] flex flex-col gap-5"}>

                <div className={"flex flex-row items-baseline gap-3"}>
                    <Text text={"Удалить раздмел"} className={"text-[20px] font-medium"}/>
                    <Text text={props.tableRow.item[0]} className={"text-text-gray"}/>
                </div>

                <Text text={"Предупреждаем, это действие невозможно отменить" +
                    " и все категории и товары данного раздела удалятся" +
                    " без возможности восстановления"}/>

                <TextInput
                    labelText={"Подтвердите действие"}
                    placeholder={"Напишите название раздела, который вы хотите удалить"}
                    onChange={setSectionName}
                    value={sectionName}
                />

                <Button
                    text={"Удалить раздел"}
                    onClick={onDeleteCategory}
                    classNames={{button: "bg-info-red sm:hover:bg-red-700"}}
                />

            </div>
        </PopupWrapper>
    );

};

export default DeleteSectionPopup;
