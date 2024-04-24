import React, {useEffect, useState} from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {CreateBannerData, CreateBannerSchema} from "@/schemas/admin/CreateBannerSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUnit} from "effector-react";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";
import {HeaderDescription} from "@/types/dto/text";
import {WrapperProps} from "@/types/props/Wrapper";
import {$bannerIdToEdit, createBannerFx, editBannerFx, RequestBanner} from "@/app/admin/promo/models/banner.model";
import Snackbar from "@/components/organisms/snackbar/Snackbar";

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

const AddPromoPopup = (props: PopupProps) => {

    const [reqStatus, setReqStatus] = useState<boolean>()
    const [editStatus, setEditStatus] = useState<boolean>()

    const [bannerIdToEdit, createBanner, editBanner]
        = useUnit([$bannerIdToEdit, createBannerFx, editBannerFx])

    const methods = useForm<CreateBannerData>({
        resolver: zodResolver(CreateBannerSchema),
        mode: "onBlur"
    })

    const {watch, reset} = methods

    const onSubmit = (fieldValues: FieldValues) => {
        if (bannerIdToEdit) {
            editBanner({...fieldValues, id: bannerIdToEdit.id} as RequestBanner)
                .then(_ => setEditStatus(true))
                .catch(_ => setEditStatus(false))
        } else {
            createBanner(fieldValues as RequestBanner)
                .then(_ => setReqStatus(true))
                .catch(_ => setReqStatus(false))
        }
    }

    console.log(watch())

    useEffect(() => {
        if (bannerIdToEdit) {
            reset({
                link: bannerIdToEdit.link,
                image: bannerIdToEdit.image
            })
        }
    }, []);

    return (
        <PopupWrapper {...props}>
            <FormProvider {...methods}>
                <Snackbar
                    success={reqStatus === true}
                    header={reqStatus ? "Промо-баннер успешно создан!" : "Возникли ошибки при создании промо-баннера"}
                    message={reqStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={reqStatus !== undefined}
                    action={props.onClose}
                    onClose={() => props.onClose?.()}
                />
                <Snackbar
                    success={editStatus === true}
                    header={editStatus ? "Редактирование прошло успешно!" : "Возникли ошибки при редактировании"}
                    message={editStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={editStatus !== undefined}
                    action={props.onClose}
                    onClose={() => props.onClose?.()}
                />
                <Form className={"w-[800px] flex flex-col gap-5"}>
                    <Text text={"Новый промо-баннер"} className={"text-[20px] font-medium"}/>
                    <PopupBlock
                        header={"Ссылка на товар"}
                        description={"Откройте страницу товара на сайте и скопируйте ссылку в адресной строке браузера"}
                    >
                        <ControlledTextInput name={"link"} placeholder={"Вставьте ссылку на товар"}/>
                    </PopupBlock>
                    <PopupBlock
                        header={"Фотография промо-баннера"}
                        description={"Данная фотография будет отображаться в первом блоке на главном странице сайта"}
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

export default AddPromoPopup;
