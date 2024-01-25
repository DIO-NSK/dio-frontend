import React, {useState} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import DropdownInput from "@/components/atoms/inputs/dropdown-input/DropdownInput";
import {SelectedItem} from "@/types/select";
import Button from "@/components/atoms/buttons/button/Button";

const PickAddressPopup = (props: PopupProps) => {

    const dropdownItems: SelectedItem[] = [
        {text: "Никитина 64, кв. 27", isSelected: true},
        {text: "Терешковой 10, кв. 42", isSelected: true},
        {text: "Морской проспект 11, кв. 12", isSelected: true},
        {text: "Совесткая 66/1, кв. 27", isSelected: true},
        {text: "Обская 50, кв. 134", isSelected: true},
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectedItem>(dropdownItems[0])

    return (
        <PopupWrapper onClose={props.onClose}>
            <div className={"w-[500px] flex flex-col gap-5"}>
                <Text text={"Выберите существующий адрес"} className={"text-lg text-medium"}/>
                <Text
                    text={"Выберите существующий адрес, чтобы не заполнять заново поля в форме адреса доставки"}
                    className={"text-base text-text-gray"}
                />
                <DropdownInput
                    width={"w-full"}
                    items={dropdownItems}
                    onSelect={setActiveItem}
                    selectedItem={activeItem}
                />
                <Button
                    text={"Подтвердить"}
                    onClick={props.onClose}
                />
            </div>
        </PopupWrapper>
    );
};

export default PickAddressPopup;
