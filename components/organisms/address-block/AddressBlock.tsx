import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import React, {useEffect, useState} from "react";
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

const MapAddressPicker = dynamic(() => import("@/components/organisms/map/Map"), {
    ssr: true
});

export interface AddressBlockProps {
    buttonText: string;
    onOpenPopup: () => void;
    onChange: (address: Address) => void;
    location: Address
}

const itemTemplate = (item: Suggestion) => (
    <Text text={item.address} className={'text-base text-text-gray'}/>
);

export const AddressBlock = ({buttonText, onOpenPopup, location, onChange}: AddressBlockProps) => {

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
        onChange({address: value.address, latitude: value.lat, longitude: value.lng});
        setInputValue(value.address);
        setChangedViaInput(true);
    }

    const handleSetPosition = (position: LatLng) => {
        onChange({address : inputValue, latitude: position.lat, longitude: position.lng});
        setChangedViaInput(false);
    }

    useEffect(() => {
        if (!isChangedViaInput && location?.latitude > 0 && location?.longitude > 0) {
            getLocationByCoords({lat: location.latitude, lng: location.longitude})
                .then(suggestions => {
                    if (suggestions[0]) {
                        onChange({
                            address: suggestions[0].value,
                            latitude: location.latitude,
                            longitude: location.longitude
                        })
                        setInputValue(suggestions[0].value)
                    }
                })
        }
    }, [location?.latitude, location?.longitude]);

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
                <AutoComplete
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
                <MapAddressPicker
                    position={{lat: location.latitude, lng: location.longitude} as LatLng}
                    setPosition={handleSetPosition}
                />
            </BackgroundBlockWrapper>
        )
    }

}