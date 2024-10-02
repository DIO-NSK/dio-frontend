"use client"

import Button from "@/components/atoms/buttons/button/Button";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelCharBlock from "@/components/organisms/blocks/admin-panel-char-block/AdminPanelCharBlock";
import { CreateCategoryData, CreateCategorySchema, } from "@/schemas/admin/CreateCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";
import { DefaultValues, FieldValues, Form, FormProvider, useForm } from "react-hook-form";
import { $formData, changeCategoryFx, ChangeCategoryRequest, editCategoryPageDidMountEvent } from "./model";
import { useRouter } from "next/navigation";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import Text from "@/components/atoms/text/text-base/Text";
import { cn } from "@/utlis/cn";
import FileURLInput from "@/components/atoms/inputs/file-input/FileURLInput";
import ControlledSwitch from "@/components/atoms/switch/ControlledSwitch";
import { SeoBlock } from "@/components/organisms/seo-block/SeoBlock";

const textInputCN = "w-full px-7 pb-7 border-b-2 border-light-gray"

const AdminEditCategoryPage = ({ params }: {
    params: {
        sectionId: number
        categoryId: number
    }
}) => {

    const router = useRouter();

    const [pageDidMount, changeCategory, formData]
        = useUnit([editCategoryPageDidMountEvent, changeCategoryFx, $formData]);

    const [editHeader, setEditHeader] = useState<string>('')
    const [editMessage, setEditMessage] = useState<string>('')
    const [editStatus, setEditStatus] = useState<boolean | undefined>(undefined)

    const methods = useForm<CreateCategoryData>({
        resolver: zodResolver(CreateCategorySchema),
        mode: "onSubmit"
    })

    const {
        formState: { isSubmitting, errors },
        handleSubmit,
        reset
    } = methods

    const onSaveChanges = (formData: FieldValues) => {

        const reqProperties = (formData as CreateCategoryData).properties.map(prop => ({
            ...prop, valueType: prop.valueType.value
        }))

        const request = {
            ...formData as CreateCategoryData,
            properties: reqProperties,
            sequenceNumber: formData?.sequenceNumber
        }

        changeCategory(request as ChangeCategoryRequest)
            .then(_ => {
                setEditStatus(true)
                setEditHeader("Категория успешщно изменена!")
                setEditMessage("Вы можете вернуться назад")
            })
            .catch(error => {
                setEditStatus(false)
                setEditHeader("Возникли ошибки при редактировании категории")
                setEditMessage(error.message)
            })
    };

    useEffect(() => {
        pageDidMount(params.categoryId)
    }, [])

    useEffect(() => {
        reset({
            ...formData,
            isNeedParsing: formData?.isNeedParsing
        } as DefaultValues<CreateCategoryData>)
    }, [formData])

    methods.watch()

    return (
        <React.Fragment>
            <Snackbar
                success={editStatus === true}
                header={editHeader} message={editMessage}
                action={() => router.back()}
                open={editStatus !== undefined}
                onClose={() => setEditStatus(undefined)}
            />
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Редактирование категории"}
                hasBackIcon
            />
            {formData && <FormProvider {...methods}>
                <Form className={"flex flex-col sm:gap-7"}>
                    <div className={textInputCN}>
                        <ControlledTextInput
                            labelText={"Название категории"}
                            placeholder={"Введите название категории"}
                            name={"name"}
                        />
                    </div>
                    <div className={cn(textInputCN, "flex flex-col gap-3")}>
                        <Text text={'Фотография категории'} />
                        {methods.getValues("image") ? (
                            <AdminPhotoCard
                                onDelete={() => methods.setValue("image", null)}
                                name={"image"} className={"w-full"}
                                canDelete
                            />
                        ) : (
                            <FileURLInput
                                onChange={(value) => methods.setValue("image", value)}
                                placeholder={"Выберите файл"} className={"w-full"}
                            />
                        )}
                    </div>
                    <AdminPanelCharBlock
                        blockName={"properties"}
                        disabled
                    />
                    <div className={"w-full px-7 pb-7 border-b-2 border-light-gray flex items-center gap-4"}>
                        <ControlledSwitch name={'isNeedParsing'} />
                        <Text text={'Принадлежит ли к категории "Наши воды"'} className={'text-base text-black'} />
                    </div>
                    <div className="w-full px-7 pb-7 border-b-2 border-light-gray">
                        <SeoBlock seoId={(formData as any).seoId} hintUrl="vody-19-litrov" />
                    </div>
                    <Button
                        disabled={isSubmitting}
                        classNames={{ button: "mx-7 w-[250px]" }}
                        text={isSubmitting ? "Отправка.." : "Сохранить"}
                        onClick={handleSubmit(onSaveChanges)}
                    />
                </Form>
            </FormProvider>}
        </React.Fragment>
    );

};

export default AdminEditCategoryPage;
