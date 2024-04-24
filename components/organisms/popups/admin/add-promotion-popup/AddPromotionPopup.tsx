import React, {useState} from 'react';
import {PopupProps} from "@/types/props/Popup";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateBannerData, CreateBannerSchema} from "@/schemas/admin/CreateBannerSchema";
import {useUnit} from "effector-react";
import {
    $promotionToEdit,
    createPromotionFx,
    editPromotionFx,
    RequestPromotion
} from "@/app/admin/promo/models/promotion.model";
import {HeaderDescription} from "@/types/dto/text";
import {WrapperProps} from "@/types/props/Wrapper";

const blockCV = "w-full flex flex-col gap-4"

const PopupBlock = (props: HeaderDescription & WrapperProps) => (
    <section className={blockCV}>
        <div className={"flex flex-col gap-4"}>
            <div className={"flex flex-col"}>
                <Text text={props.header} className={"text-[18px]"}/>
                <Text text={props.description} className={"text-text-gray"}/>
            </div>
            {props.children}
        </div>
    </section>
)

const AddPromotionPopup = (props: PopupProps) => {

    const [createStatus, setCreateStatus] = useState<boolean | undefined>(undefined)
    const [editStatus, setEditStatus] = useState<boolean | undefined>(undefined)

    const [promotionToEdit, createPromotion, editPromotion]
        = useUnit([$promotionToEdit, createPromotionFx, editPromotionFx])

    const methods = useForm<CreateBannerData>({
        resolver : zodResolver(CreateBannerSchema),
        mode : "onSubmit"
    })

    console.log(methods.watch())

    const onSubmit = (fieldValues : FieldValues) => {
        if (promotionToEdit) {
            editPromotion({...fieldValues, id : promotionToEdit.id} as RequestPromotion)
                .then(_ => setEditStatus(true))
                .catch(_ => setEditStatus(false))
        } else {
            createPromotion(fieldValues as RequestPromotion)
                .then(_ => setCreateStatus(true))
                .catch(_ => setCreateStatus(false))
        }
    }

    return (
        <PopupWrapper {...props}>
            <FormProvider {...methods}>
                <Snackbar
                    success={createStatus === true}
                    header={createStatus ? "Промо-акция успешно создан!" : "Возникли ошибки при создании промо-акции"}
                    message={createStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={createStatus !== undefined}
                    onClose={() => props.onClose?.()}
                    action={props.onClose}
                />
                <Snackbar
                    success={editStatus === true}
                    header={editStatus ? "Промо-акция отредактирована успешо!" : "Возникли ошибки при редактировании промо-акции"}
                    message={editStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={editStatus !== undefined}
                    action={props.onClose}
                    onClose={() => props.onClose?.()}
                />
                <Form className={"w-[800px] flex flex-col gap-5"}>
                    <Text text={"Новая "} className={"text-[20px] font-medium"}/>
                    <PopupBlock
                        header={"Ссылка на акцию"}
                        description={"Откройте страницу акции на сайте и скопируйте ссылку в адресной строке браузера"}
                    >
                        <ControlledTextInput name={"link"} placeholder={"Вставьте ссылку на акцию"}/>
                    </PopupBlock>
                    <PopupBlock
                        header={"Фотография промо-акции"}
                        description={"Данная фотография будет являться ссылкой на страницу акции"}
                    >
                        {methods.getValues("image") ? (
                            <AdminPhotoCard
                                onDelete={() => methods.setValue("image", null)}
                                name={"image"}
                                className={"w-full"}
                            />
                        ) : (
                            <FileInput
                                onChange={(value) => methods.setValue("image", value)}
                                placeholder={"Выберите файл"}
                                className={"w-full"}
                            />
                        )}
                    </PopupBlock>
                    <Button
                        text={"Добавить"}
                        disabled={methods.formState.isSubmitting}
                        onClick={methods.handleSubmit(onSubmit)}
                        classNames={{button: "w-[250px]"}}
                    />
                </Form>
            </FormProvider>
        </PopupWrapper>
    );

};

export default AddPromotionPopup;
