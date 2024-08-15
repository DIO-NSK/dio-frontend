import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import React, {useEffect, useRef, useState} from "react";
import {LatLng} from "leaflet";
import {
    getCoordsByLocation,
    getLocationByCoords,
    Suggestion
} from "@/components/organisms/address-block/AddressBlock.api";
import dynamic from "next/dynamic";

import {
    AutoComplete,
    AutoCompleteChangeEvent,
    AutoCompleteCompleteEvent,
    AutoCompleteSelectEvent
} from "primereact/autocomplete";
import {pt} from "@/components/organisms/address-block/AddressBlock.styles";
import Text from "@/components/atoms/text/text-base/Text";
import {Address} from "@/components/organisms/map/Map.types";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";

const MapAddressPicker = dynamic(() => import("@/components/organisms/map/Map"), {
    ssr: true
});

export interface AddressBlockProps {
    buttonText: string;
    onOpenPopup: () => void;
    onChange: (address: Address) => void;
    location: Address,
    error ?: string
}

const itemTemplate = (item: Suggestion) => (
    <Text text={item.address} className={'whitespace-wrap max-w-full text-base text-text-gray'}/>
);

export const AddressBlock = ({buttonText, onOpenPopup, location, onChange, error}: AddressBlockProps) => {

    const ref = useRef<AutoComplete>(null);

    const [inputValue, setInputValue] = useState<string>(location?.address ?? '');
    const [isChangedViaInput, setChangedViaInput] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    const searchItems = ({query}: AutoCompleteCompleteEvent) => {
        getCoordsByLocation(query).then(setSuggestions);
    }

    const handleOnChange = (event: AutoCompleteChangeEvent) => {
        onChange({...location, address: event.value});
        setInputValue(event.value);
    }

    const handleSelect = ({value}: AutoCompleteSelectEvent) => {
        onChange({
            ...value,
            latitude: value.lat,
            longitude: value.lng
        });

        setInputValue(value.address);
        setChangedViaInput(true);
    }

    const handleSetPosition = (position: LatLng) => {
        onChange({
            ...location,
            address: inputValue,
            latitude: position.lat,
            longitude: position.lng
        });

        setChangedViaInput(false);
    }

    useEffect(() => {
        if (!isChangedViaInput && location?.latitude > 0 && location?.longitude > 0) {
            getLocationByCoords({lat: location.latitude, lng: location.longitude})
                .then(suggestions => {
                    if (suggestions[0]) {
                        onChange(suggestions[0])
                        setInputValue(suggestions[0].address)
                    }
                })
        }
    }, [location?.latitude, location?.longitude]);

    useEffect(() => console.log('>location', location), [location]);

    if (location?.latitude > 0 && location?.longitude > 0) {
        return (
            <BackgroundBlockWrapper
                header={"Адрес доставки"}
                rightContent={
                    <Button
                        text={buttonText}
                        onClick={onOpenPopup}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        size={"sm"}
                    />
                }
            >
                <div className={'col-span-full flex flex-col gap-2'}>
                    <AutoComplete
                        ref={ref}
                        title={'Адрес доставки'}
                        placeholder={'Введите адрес доставки'}
                        value={inputValue}
                        suggestions={suggestions}
                        completeMethod={searchItems}
                        onChange={handleOnChange}
                        itemTemplate={itemTemplate}
                        onSelect={handleSelect}
                        pt={pt}
                    />
                    {error ? <Text text={error} className={'text-sm text-info-red'}/> : null}
                </div>
                <MapAddressPicker
                    position={{lat: location.latitude, lng: location.longitude} as LatLng}
                    setPosition={handleSetPosition}
                />
                <ControlledTextInput
                    name={'entranceNumber'}
                    labelText={'Подъезд'}
                    classNames={{wrapper: 'col-span-1'}}
                    placeholder={'Введите номер подъезда'}
                    theme={'filled'}
                />
                <ControlledTextInput
                    name={'floor'}
                    labelText={'Этаж'}
                    classNames={{wrapper: 'col-span-1'}}
                    placeholder={'Введите номер этажа'}
                    theme={'filled'}
                />
            </BackgroundBlockWrapper>
        )
    }

}