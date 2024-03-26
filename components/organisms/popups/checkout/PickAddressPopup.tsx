import React, {useEffect} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {
    $activeUserAddress,
    $userAddress,
    getAddressEvent,
    selectUserAddressEvent
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/model";

const PickAddressPopup = (props: PopupProps) => {

    const getUserAddresses = useUnit(getAddressEvent)

    const [userAddresses, activeAddress, selectAddress]
        = useUnit([$userAddress, $activeUserAddress, selectUserAddressEvent])

    useEffect(() => {
        getUserAddresses()
    }, [])

    if (activeAddress) return (
        <PopupWrapper onClose={props.onClose}>
            <div className={"w-[500px] flex flex-col gap-5"}>
                <Text text={"Выберите существующий адрес"} className={"text-lg text-medium"}/>
                <Text
                    text={"Выберите существующий адрес, чтобы не заполнять заново поля в форме адреса доставки"}
                    className={"text-base text-text-gray"}
                />
                <SelectInput
                    width={"w-full"}
                    items={userAddresses}
                    onSelect={selectAddress}
                    selectedItem={activeAddress}
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
