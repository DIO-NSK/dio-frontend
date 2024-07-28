import React, {useState} from 'react';
import {TableItemPopup} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";

type DeletePopupProps = {
    onDelete : (itemId : number) => void,
    header ?: string,
    message ?: string,
    buttonText ?: string
} & TableItemPopup<string[]>

const DeletePopup = (props : DeletePopupProps) => {

    const onDeleteCategory = () => {
        props.onDelete(props.tableRow.id)
        props.onClose?.()
    }

    return (
        <PopupWrapper placement={"center"} {...props}>
            <div className={"w-[500px] flex flex-col gap-5"}>

                <div className={"flex flex-row items-baseline gap-3"}>
                    <Text text={props.header ?? "Удалить раздел"} className={"text-[20px] font-medium"}/>
                    <Text text={props.tableRow.item[0]} className={"text-text-gray"}/>
                </div>

                <Text text={props.message ?? "Предупреждаем, это действие невозможно отменить" +
                    " и все категории и товары данного раздела удалятся" +
                    " без возможности восстановления"}/>

                <Button
                    text={props.buttonText ?? "Удалить раздел"}
                    onClick={onDeleteCategory}
                    classNames={{button: "bg-info-red sm:hover:bg-red-700"}}
                />

            </div>
        </PopupWrapper>
    );

};

export default DeletePopup;
