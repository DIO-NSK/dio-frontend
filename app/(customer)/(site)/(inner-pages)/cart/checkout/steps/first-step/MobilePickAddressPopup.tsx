import React, {useEffect, useState} from 'react';
import {useUnit} from "effector-react";
import {
    $userAddress,
    getAddressFx,
    selectUserAddressEvent
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/model";
import {SelectItem} from "@/types/props/SelectItem";
import {UserAddress} from "@/types/dto/user/credentials/UserAddress";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {PopupProps} from "@/types/props/Popup";
import {FiX} from "react-icons/fi";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {Address} from "@/components/organisms/map/Map.types";

const MobilePickAddressPopup = (props : PopupProps) => {

    const getUserAddresses = useUnit(getAddressFx)

    const [userAddresses, selectAddress] = useUnit([$userAddress, selectUserAddressEvent])
    const [userAddress, setUserAddress] = useState<SelectItem<Address> | null>(null)

    const handleConfirmUserAddress = () => {
        selectAddress(userAddress!!)
        props.onClose?.()
    }

    useEffect(() => {
        getUserAddresses().then(items => {
            const selectedItem = {
                name: items[0].address,
                value: items[0]
            } as SelectItem<Address>

            setUserAddress(selectedItem)
        })
    }, [])

    return (
        <section className={"-mt-7 flex flex-col gap-5"}>
            <HeaderRow
                rightContent={<FiX onClick={props.onClose} size={"20px"}/>}
                header={"Выберите существующий адрес"}
                headerCN={"text-lg"}
            />
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
        </section>
    );

};

export default MobilePickAddressPopup;