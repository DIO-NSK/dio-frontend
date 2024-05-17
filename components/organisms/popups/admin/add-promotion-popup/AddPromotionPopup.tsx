import React, {useEffect, useState} from 'react';
import {PopupProps} from "@/types/props/Popup";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileURLInput from "@/components/atoms/inputs/file-input/FileURLInput";
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
    $editPromotionStatus,
    $promotionToEdit,
    createPromotionFx,
    editPromotionEvent,
    RequestPromotion,
    setPromotionToEditEvent
} from "@/app/admin/promo/models/promotion.model";
import {HeaderDescription} from "@/types/dto/text";
import {WrapperProps} from "@/types/props/Wrapper";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";

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

    const editPromotionStatus = useUnit($editPromotionStatus)
    const [createStatus, setCreateStatus] = useState<boolean | undefined>(undefined)

    const [promotionToEdit, setPromotionToEdit, createPromotion, editPromotion]
        = useUnit([$promotionToEdit, setPromotionToEditEvent, createPromotionFx, editPromotionEvent])

    const methods = useForm<CreateBannerData>({
        resolver: zodResolver(CreateBannerSchema),
        mode: "onSubmit"
    })

    const {reset} = methods

    console.log(methods.watch())

    const handleClose = () => {
        setPromotionToEdit(null)
        props.onClose?.()
    }

    const onSubmit = (fieldValues: FieldValues) => {
        if (promotionToEdit) {
            editPromotion({...fieldValues, id: promotionToEdit.id} as RequestPromotion)
        } else {
            createPromotion(fieldValues as RequestPromotion)
                .then(_ => setCreateStatus(true))
                .then(_ => setPromotionToEdit(null))
                .catch(_ => setCreateStatus(false))
        }
    }

    useEffect(() => {
        if (promotionToEdit) {
            reset({
                link: `/sales/${promotionToEdit.promoId}`,
                image: promotionToEdit.image
            })
        }
    }, []);

    return (
        <PopupWrapper onClose={handleClose}>
            <FormProvider {...methods}>
                <Snackbar
                    success={createStatus === true}
                    header={createStatus ? "Промо-акция успешно создан!" : "Возникли ошибки при создании промо-акции"}
                    message={createStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={createStatus !== undefined}
                    onClose={handleClose}
                    action={handleClose}
                />
                <Snackbar
                    success={editPromotionStatus === true}
                    header={editPromotionStatus ? "Промо-акция отредактирована успешо!" : "Возникли ошибки при редактировании промо-акции"}
                    message={editPromotionStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={editPromotionStatus !== null}
                    action={handleClose}
                    onClose={handleClose}
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
                                canDelete={true}
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
                        text={promotionToEdit ? "Редактировать" : "Добавить"}
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
