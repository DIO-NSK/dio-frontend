import React, {useState} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";

const AdminSectionPopup = (props: PopupProps) => {

    const [sectionName, setSectionName] = useState<string>("")
    const handleSubmit = () => console.log("Submit")

    return (
        <PopupWrapper {...props}>
            <div className={"w-[400px] flex flex-col gap-5"}>
                <Text text={"Создать раздел"} className={"text-[20px] font-medium"}/>
                <TextInput
                    labelText={"Название раздела"}
                    placeholder={"Введите название"}
                    value={sectionName}
                    onChange={setSectionName}
                    hintText={{
                        hintMessage: "Название раздела не может быть больше 60 символов",
                        type: "neutral"
                    }}
                />
                <Button
                    text={"Подтвердить"}
                    onClick={handleSubmit}
                />
            </div>
        </PopupWrapper>
    );
};

export default AdminSectionPopup;
