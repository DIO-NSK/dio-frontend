import React, {useState} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {SelectItem} from "@/types/props/SelectItem";
import Button from "@/components/atoms/buttons/button/Button";

const PickAddressPopup = (props: PopupProps) => {

    const dropdownItems: SelectItem<boolean>[] = [
        {name: "Никитина 64, кв. 27", value: true},
        {name: "Терешковой 10, кв. 42", value: true},
        {name: "Морской проспект 11, кв. 12", value: true},
        {name: "Совесткая 66/1, кв. 27", value: true},
        {name: "Обская 50, кв. 134", value: true},
    ]

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectItem<boolean>>(dropdownItems[0])

    return (
        <PopupWrapper onClose={props.onClose}>
            <div className={"w-[500px] flex flex-col gap-5"}>
                <Text text={"Выберите существующий адрес"} className={"text-lg text-medium"}/>
                <Text
                    text={"Выберите существующий адрес, чтобы не заполнять заново поля в форме адреса доставки"}
                    className={"text-base text-text-gray"}
                />
                <SelectInput
                    width={"w-full"}
                    items={dropdownItems}
                    onSelect={setActiveItem}
                    selectedItem={activeItem}
                />
                <Button
                    text={"Подтвердить"}
                    onClick={() => props.onClose?.()}
                />
            </div>
        </PopupWrapper>
    );
};

export default PickAddressPopup;
