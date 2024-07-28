"use client"

import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import Text from "@/components/atoms/text/text-base/Text";
import RadioGroup from "@/components/moleculas/radio-group/RadioGroup";
import {RadioButtonItem} from "@/types/props/RadioButtonItem";

const radioButtonItems: RadioButtonItem[] = [
    {groupName: "address", value: "ул. Никитина 64, кв. 27", label: "ул. Никитина 64, кв. 27"},
    {groupName: "address", value: "ул. Гоголя 11/2, кв. 12", label: "ул. Гоголя 11/2, кв. 12"},
    {groupName: "address", value: "ул. Революции 60, кв. 42", label: "ул. Революции 60, кв. 42"},
    {groupName: "address", value: "пр. Морской 11, кв. 12", label: "пр. Морской 11, кв. 12"},
]

const SelectAddressPopup = ({onClose} : {onClose : () => void}) => {
    return (
        <MobilePageWrapper className={"fixed h-full top-0 left-0 z-20"}>
            <HeaderRow
                rightContent={
                    <FiX
                        onClick={onClose}
                        size={"20px"}
                    />
                }
                header={"Выберите адрес"}
                theme={"bordered"}
            />
            <Text
                text={"Выберите существующий адрес, чтобы не заполнять заново поля в форме адреса доставки"}
                className={"text-text-gray"}
            />
            <Text text={"Адрес доставки"} className={"text-[18px] font-medium"}/>
            <RadioGroup items={radioButtonItems} name={"address"}/>
        </MobilePageWrapper>
    );
};

export default SelectAddressPopup;
