import React, {useEffect, useState} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {
    $userAddress,
    getAddressEvent, getAddressFx,
    selectUserAddressEvent
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/model";
import {SelectItem} from "@/types/props/SelectItem";
import {UserAddress} from "@/types/dto/user/credentials/UserAddress";

const PickAddressPopup = (props: PopupProps) => {

    const getUserAddresses = useUnit(getAddressFx)

    const [userAddresses, selectAddress] = useUnit([$userAddress, selectUserAddressEvent])
    const [userAddress, setUserAddress] = useState<SelectItem<UserAddress> | null>(null)

    const handleConfirmUserAddress = () => {
        selectAddress(userAddress!!)
        props.onClose?.()
    }

    useEffect(() => {
        getUserAddresses().then(items => {
            if (items) {
                const selectedItem = {
                    name: `ул. ${items[0].street}, д. ${items[0].houseNumber}, кв. ${items[0].flatNumber}`,
                    value: items[0]
                } as SelectItem<UserAddress>
                setUserAddress(selectedItem)
            }
        })
    }, [])

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
                    items={userAddresses}
                    onSelect={setUserAddress}
                    selectedItem={userAddress}
                />
                <Button
                    onClick={handleConfirmUserAddress}
                    text={"Подтвердить"}
                />
            </div>
        </PopupWrapper>
    );

};

export default PickAddressPopup;
