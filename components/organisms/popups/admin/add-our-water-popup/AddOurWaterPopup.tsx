import React, {useEffect, useState} from 'react';
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {HeaderDescription} from "@/types/dto/text";
import {WrapperProps} from "@/types/props/Wrapper";
import {useUnit} from "effector-react";
import {CreateBannerData, CreateBannerSchema} from "@/schemas/admin/CreateBannerSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    $ourWaterToEdit,
    $rangeOurWaters,
    createOurWaterFx,
    editOurWaterFx,
    getRangeOurWatersEvent,
    RequestOurWater
} from "@/app/admin/promo/models/our_waters.model";
import {PopupProps} from "@/types/props/Popup";

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

const AddOurWaterPopup = (props: PopupProps) => {

    const [createStatus, setCreateStatus] = useState<boolean | undefined>(undefined)
    const [editStatus, setEditStatus] = useState<boolean | undefined>(undefined)


    const [rangeOurWaters, getRangeOurWaters] = useUnit([$rangeOurWaters, getRangeOurWatersEvent])
    const [ourWaterToEdit, createOurWater, editOurWater]
        = useUnit([$ourWaterToEdit, createOurWaterFx, editOurWaterFx])

    const methods = useForm<CreateBannerData>({
        resolver : zodResolver(CreateBannerSchema),
        mode : "onSubmit"
    })

    console.log(methods.watch())

    // TODO fix props
    const onSubmit = (fieldValues : FieldValues) => {
        if (ourWaterToEdit) {
            editOurWater({...fieldValues, id : ourWaterToEdit.id} as RequestOurWater)
                .then(_ => setEditStatus(true))
                .catch(_ => setEditStatus(false))
        } else {
            createOurWater(fieldValues as RequestOurWater)
                .then(_ => setCreateStatus(true))
                .catch(_ => setCreateStatus(false))
        }
    }

    useEffect(() => {
        getRangeOurWaters()
    }, [])

    return (
        <PopupWrapper {...props}>
            <FormProvider {...methods}>
                <Snackbar
                    success={createStatus === true}
                    header={createStatus ? "Карточка успешно создана!" : "Возникли ошибки при создании карточки"}
                    message={createStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={createStatus !== undefined}
                    onClose={() => props.onClose?.()}
                    action={props.onClose}
                />
                <Snackbar
                    success={editStatus === true}
                    header={editStatus ? "Карточка отредактирована успешо!" : "Возникли ошибки при редактировании карточки"}
                    message={editStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={editStatus !== undefined}
                    action={props.onClose}
                    onClose={() => props.onClose?.()}
                />
                <Form className={"w-[800px] flex flex-col gap-5"}>
                    <Text text={"Новая карточка"} className={"text-[20px] font-medium"}/>
                    <PopupBlock
                        description={"Данный продукт будет отображаться на главной странице в разделе «Наши воды»"}
                        header={"Продукт «Наши воды»"}
                    >
                        <ControlledTextInput name={"link"} placeholder={"Вставьте ссылку на акцию"}/>
                    </PopupBlock>
                    <PopupBlock
                        header={"Фотография карточки"}
                        description={"Выберите фотографию без фона. Данная фотография будет отображаться на главной странице в разделе «Наши воды»"}
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

export default AddOurWaterPopup;
