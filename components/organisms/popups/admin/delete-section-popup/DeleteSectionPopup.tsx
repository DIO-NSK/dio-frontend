import React, {useState} from 'react';
import {TableItemPopup} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";

const DeleteSectionPopup = (props: TableItemPopup) => {

    const [sectionName, setSectionName] = useState<string>("")
    const handleDeleteCategory = () => console.log("DELETE")

    return (
        <PopupWrapper placement={"center"} {...props}>
            <div className={"w-[500px] flex flex-col gap-5"}>

                <div className={"flex flex-row items-baseline gap-3"}>
                    <Text text={"Удалить раздмел"} className={"text-[20px] font-medium"}/>
                    <Text text={props.tableItem.items[0]} className={"text-text-gray"}/>
                </div>

                <Text text={"Предупреждаем, это действие невозможно отменить" +
                    " и все категории и товары данного раздела удалятся" +
                    " без возможности восстановления"}/>

                <TextInput
                    labelText={"Подтвердите действие"}
                    placeholder={"Напишите название раздела, который вы хотите удалить"}
                    value={sectionName}
                    onChange={setSectionName}
                />

                <Button
                    text={"Удалить раздел"}
                    onClick={handleDeleteCategory}
                    classNames={{button : "bg-info-red hover:bg-red-700"}}
                />

            </div>
        </PopupWrapper>
    );

};

export default DeleteSectionPopup;
