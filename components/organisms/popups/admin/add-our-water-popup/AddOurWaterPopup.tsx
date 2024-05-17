import React, {useEffect, useState} from 'react';
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileURLInput from "@/components/atoms/inputs/file-input/FileURLInput";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {HeaderDescription} from "@/types/dto/text";
import {WrapperProps} from "@/types/props/Wrapper";
import {useUnit} from "effector-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    $editOurWaterStatus,
    $ourWaterToEdit, $rangeOurWaters,
    $selectOurWaters, createOurWaterFx,
    getRangeOurWatersEvent, RangeOurWater, RequestCreateOurWater,
    RequestOurWater,
    setOurWaterToEditEvent,
    submitOurWaterEvent,
    submitOurWaterFx
} from "@/app/admin/promo/models/our_waters.model";
import {PopupProps} from "@/types/props/Popup";
import ControlledSelectInput
    from "@/components/atoms/inputs/select-input/controlled-select-input/ControlledSelectInput";
import {CreateOurWaterData, CreateOurWaterSchema} from "@/schemas/admin/CreateOurWaterSchema";
import FileInput from "@/components/atoms/inputs/file-input/FileInput";

const blockCV = "w-full flex flex-col gap-4"

const createOurWaterRequest = (formData : RequestOurWater, rangeWater : RangeOurWater) : RequestCreateOurWater => {
    return {
        categoryId: rangeWater?.categoryId,
        filterId: rangeWater?.manufacturerFilterId,
        ourWater: formData
    }
}

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
    const [ourWaters, getRangeOurWaters] = useUnit([$selectOurWaters, getRangeOurWatersEvent])

    const rangeOurWaters = useUnit($rangeOurWaters)

    const [ourWaterToEdit, setOurWaterToEdit, createOurWater, editOurWater, editStatus]
        = useUnit([$ourWaterToEdit, setOurWaterToEditEvent, createOurWaterFx, submitOurWaterEvent, $editOurWaterStatus])

    const methods = useForm<CreateOurWaterData>({
        resolver: zodResolver(CreateOurWaterSchema),
        mode: "onSubmit"
    })

    const {reset} = methods

    console.log(methods.watch())

    const handleClose = () => {
        setOurWaterToEdit(null)
        props.onClose?.()
    }

    const onSubmit = (fieldValues: FieldValues) => {
        if (ourWaterToEdit) {
            editOurWater(fieldValues as RequestOurWater)
        } else {
            createOurWater(createOurWaterRequest(fieldValues as RequestOurWater, rangeOurWaters!!))
                .then(_ => setCreateStatus(true))
                .then(_ => setOurWaterToEdit(null))
                .catch(_ => setCreateStatus(false))
        }
    }

    useEffect(() => {
        getRangeOurWaters()
    }, [])

    useEffect(() => {
        if (ourWaterToEdit) {
            reset({
                ourWater: {name: ourWaterToEdit.name, value: ourWaterToEdit.name},
                image: ourWaterToEdit.image
            })
        }
    }, [ourWaterToEdit]);

    return (
        <PopupWrapper onClose={handleClose}>
            <FormProvider {...methods}>
                <Snackbar
                    success={createStatus === true}
                    header={createStatus ? "Карточка успешно создана!" : "Возникли ошибки при создании карточки"}
                    message={createStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={createStatus !== undefined}
                    onClose={handleClose}
                    action={handleClose}
                />
                <Snackbar
                    success={editStatus === true}
                    header={editStatus ? "Карточка отредактирована успешо!" : "Возникли ошибки при редактировании карточки"}
                    message={editStatus ? "Вы можете вернуться назад" : "Заполните все поля и попробуйте снова"}
                    open={editStatus !== null}
                    action={handleClose}
                    onClose={handleClose}
                />
                <Form className={"w-[800px] flex flex-col gap-5"}>
                    <Text text={"Новая карточка"} className={"text-[20px] font-medium"}/>
                    <PopupBlock
                        description={"Данный продукт будет отображаться на главной странице в разделе «Наши воды»"}
                        header={"Продукт «Наши воды»"}
                    >
                        <ControlledSelectInput
                            placeholder={"Выберите продукт из категории «Воды»"}
                            items={ourWaters}
                            name={"ourWater"}
                        />
                    </PopupBlock>
                    <PopupBlock
                        header={"Фотография карточки"}
                        description={"Выберите фотографию без фона. Данная фотография будет отображаться на главной странице в разделе «Наши воды»"}
                    >
                        {methods.getValues("image") ? (
                            <AdminPhotoCard
                                canDelete
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
                        text={ourWaterToEdit ? "Редактировать" : "Добавить"}
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
