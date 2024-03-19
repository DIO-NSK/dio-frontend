import React, {useState} from 'react';
import {PromoCard} from "@/types/dto/PromoCard";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";
import {SelectItem} from "@/types/props/SelectItem";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {AddPromoPopup} from "@/types/props/Popup";

const AddOurWaterPopup = (props: AddPromoPopup<PromoCard>) => {

    const selectItems: SelectItem<string>[] = [
        {name: "DIO", value: "dio"},
        {name: "EVIAN", value: "evian"},
        {name: "BAIKAL", value: "baikal"},
        {name: "Petroglyph", value: "petroglyph"},
    ]

    const [
        activeSelectItem,
        setActiveSelectItem
    ] = useState<SelectItem<string>>(selectItems[0])

    const [waterImage, setWaterImage] = useState<File>()

    const handleDeleteFile = () => setWaterImage(undefined)
    const handleAddPromoCard = () => {
        const card: PromoCard = {file: waterImage!!, link: activeSelectItem.name}
        props.onAddItem(card)
        props.onClose && props.onClose()
    }

    const blockCV = "w-full flex flex-col gap-4"

    const popupData = [
        {
            header: "Производитель",
            input: <SelectInput
                selectedItem={activeSelectItem}
                onSelect={setActiveSelectItem}
                items={selectItems}
            />
        }, {
            header: "Фотография",
            description: "Данная фотография будет отображаться в блоке «Наши воды» на главной странице",
            input: waterImage ? <AdminPhotoCard/> : <FileInput
                placeholder={"Выберите файл"}
                onChange={setWaterImage}
            />
        }
    ]

    return (
        <PopupWrapper {...props}>
            <div className={"w-[800px] flex flex-col gap-5"}>
                <Text text={"Новая карточка"} className={"text-[20px] font-medium"}/>
                {
                    popupData.map((block, blockIndex) =>
                        <div className={blockCV} key={blockIndex}>

                            <div className={"flex flex-col gap-1"}>
                                <Text text={block.header} className={"text-[18px]"}/>
                                {
                                    block.description && <Text
                                        text={block.description}
                                        className={"text-text-gray"}
                                    />
                                }
                            </div>

                            {block.input}

                        </div>
                    )
                }
                <Button
                    text={"Добавить"}
                    onClick={handleAddPromoCard}
                    classNames={{button: "w-[250px]"}}
                />
            </div>
        </PopupWrapper>
    );

};

export default AddOurWaterPopup;
