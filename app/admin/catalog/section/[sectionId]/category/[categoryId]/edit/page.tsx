"use client"

import Button from "@/components/atoms/buttons/button/Button";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelCharBlock from "@/components/organisms/blocks/admin-panel-char-block/AdminPanelCharBlock";
import {CreateCategoryData, CreateCategorySchema,} from "@/schemas/admin/CreateCategorySchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUnit} from "effector-react";
import React, {useEffect, useState} from "react";
import {DefaultValues, FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {$formData, changeCategoryFx, ChangeCategoryRequest, editCategoryPageDidMountEvent} from "./model";
import {useRouter} from "next/navigation";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import {CreateSaleData} from "@/schemas/admin/CreateSaleSchema";
import {CreateSaleRequest} from "@/app/admin/sales/new/model";

const textInputCN = "w-full px-7 pb-7 border-b-2 border-light-gray"

const AdminEditCategoryPage = ({params}: {
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
        formState: {isSubmitting},
        handleSubmit,
        reset
    } = methods

    useEffect(() => {
        console.log(methods.formState.errors)
    }, [methods.formState.errors]);

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
        reset({...formData} as DefaultValues<CreateCategoryData>)
    }, [formData])

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
                    <AdminPanelCharBlock blockName={"properties"}/>
                    <Button
                        disabled={isSubmitting}
                        classNames={{button: "mx-7 w-[250px]"}}
                        text={isSubmitting ? "Отправка.." : "Сохранить"}
                        onClick={handleSubmit(onSaveChanges)}
                    />
                </Form>
            </FormProvider>}
        </React.Fragment>
    );

};

export default AdminEditCategoryPage;
