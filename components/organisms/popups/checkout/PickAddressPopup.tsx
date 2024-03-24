import React, {useEffect, useState} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {SelectItem} from "@/types/props/SelectItem";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {
    $userAddress,
    getAddressEvent
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/model";
import {UserAddress} from "@/types/dto/user/credentials/UserAddress";

const PickAddressPopup = (props: PopupProps) => {

    const initAvailableAddresses = () => {
        return userAddresses.map(address =>
            ({name: `${address.street} ${address.houseNumber}`, value: address}))
    }

    const [userAddresses, getUserAddresses] = useUnit([$userAddress, getAddressEvent])
    const availableAddresses = initAvailableAddresses()

    const [
        activeItem,
        setActiveItem
    ] = useState<SelectItem<UserAddress>>(availableAddresses[0])

    useEffect(() => {
        getUserAddresses()
    }, [])

    if (availableAddresses) return (
        <PopupWrapper onClose={props.onClose}>
            <div className={"w-[500px] flex flex-col gap-5"}>
                <Text text={"Выберите существующий адрес"} className={"text-lg text-medium"}/>
                <Text
                    text={"Выберите существующий адрес, чтобы не заполнять заново поля в форме адреса доставки"}
                    className={"text-base text-text-gray"}
                />
                <SelectInput
                    width={"w-full"}
                    items={availableAddresses}
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
