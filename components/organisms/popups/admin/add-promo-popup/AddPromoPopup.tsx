import React, {useState} from 'react';
import {AddPromoPopup} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import {PromoCard} from "@/types/dto/PromoCard";
import Button from "@/components/atoms/buttons/button/Button";

const AddPromoPopup = (props : AddPromoPopup<PromoCard>) => {

    const [productLink, setProductLink] = useState<string>("")
    const [promoImage, setPromoImage] = useState<File>()

    const handleDeleteFile = () => setPromoImage(undefined)
    const handleAddPromoCard = () => {
        const promoCard : PromoCard = {file : promoImage!!, link : productLink}
        props.onAddItem(promoCard)
        props.onClose && props.onClose()
    }

    const blockCV = "w-full flex flex-col gap-4"

    const popupData = [
        {
            header: "Ссылка на товар",
            description: "Откройте страницу товара на сайте и скопируйте ссылку в адресной строке браузера",
            input: <TextInput
                placeholder={"Вставьте ссылку на товар"}
                onChange={setProductLink}
                value={productLink}
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
                                <Text text={block.description} className={"text-text-gray"}/>
                            </div>

                            {block.input}

                        </div>
                    )
                }
                <Button
                    text={"Добавить"}
                    onClick={handleAddPromoCard}
                    classNames={{button : "w-[250px]"}}
                />
            </div>
        </PopupWrapper>
    );
};

export default AddPromoPopup;
