import React, {useState} from 'react';
import {AddPromoPopup} from "@/types/props/Popup";
import {PromoCard} from "@/types/dto/PromoCard";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {SelectItem} from "@/types/props/SelectItem";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";

const AddPromotionPopup = (props: AddPromoPopup<PromoCard>) => {

    const selectItems: SelectItem<string>[] = [
        {name: "Акция 1", value: "1"},
        {name: "Акция 2", value: "2"},
        {name: "Акция 3", value: "3"},
        {name: "Акция 4", value: "4"},
    ]

    const [
        activeSelectItem,
        setActiveSelectItem
    ] = useState<SelectItem<string>>(selectItems[0])

    const [promoImage, setPromoImage] = useState<File>()

    const handleDeleteFile = () => setPromoImage(undefined)
    const handleAddPromoCard = () => {
        const promoCard: PromoCard = {file: promoImage!!, link: activeSelectItem.name}
        props.onAddItem(promoCard)
        props.onClose && props.onClose()
    }

    const blockCV = "w-full flex flex-col gap-4"

    const popupData = [
        {
            header: "Акция",
            input: <SelectInput
                selectedItem={activeSelectItem}
                onSelect={setActiveSelectItem}
                items={selectItems}
            />
        }, {
            header: "Фотография промо-акции",
            description: "Данная фотография будет отображаться в первом блоке на главном странице сайта",
            input: promoImage ? <AdminPhotoCard/> : <FileInput
                placeholder={"Выберите файл"}
                onChange={setPromoImage}
            />
        }
    ]

    return (
        <PopupWrapper {...props}>
            <div className={"w-[800px] flex flex-col gap-5"}>
                <Text text={"Новая промо-акция"} className={"text-[20px] font-medium"}/>
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

export default AddPromotionPopup;
