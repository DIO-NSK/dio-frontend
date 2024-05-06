"use client"

import Button from "@/components/atoms/buttons/button/Button";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/text/text-base/Text";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import AdminPanelCharBlock from "@/components/organisms/blocks/admin-panel-char-block/AdminPanelCharBlock";
import {CreateCategoryData, CreateCategorySchema,} from "@/schemas/admin/CreateCategorySchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUnit} from "effector-react";
import React, {useEffect} from "react";
import {DefaultValues, FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {$formData, editCategoryPageDidMountEvent} from "./model";
import {$creationStatus, createCategoryFx, resetEditStatusEvent} from "../../../model";
import {useRouter} from "next/navigation";
import Snackbar from "@/components/organisms/snackbar/Snackbar";

const textInputCN = "w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"

const AdminEditCategoryPage = ({params}: {
    params: {
        sectionId: number
        categoryId: number
    }
}) => {

    const router = useRouter();

    const [
        pageDidMount, createCategory,
        creationStatus, resetStatus, formData
    ] = useUnit([
        editCategoryPageDidMountEvent, createCategoryFx,
        $creationStatus, resetEditStatusEvent, $formData
    ]);

    const editHeader = creationStatus === "success" ? "Категория успешщно изменена!" : "Ошибка"!
    const editMessage = creationStatus === "success" ? "Вы можете вернуться назад" : "Возникли ошибки при редактировании категории"

    const methods = useForm<CreateCategoryData>({
        resolver: zodResolver(CreateCategorySchema),
        mode: "onSubmit"
    })

    const {
        formState: {isSubmitting},
        handleSubmit,
        reset
    } = methods

    const onSaveChanges = (formData: FieldValues) => {
        const request = {
            sequenceNumber: formData?.sequenceNumber,
            data: formData as CreateCategoryData,
            id: params.sectionId,
        }
        createCategory(request)
    };

    useEffect(() => {
        resetStatus()
        pageDidMount(params.categoryId)
    }, [])

    useEffect(() => {
        reset({...formData} as DefaultValues<CreateCategoryData>)
    }, [formData])

    return (
        <React.Fragment>
            <Snackbar
                success={creationStatus === "success"}
                header={editHeader} message={editMessage}
                action={() => router.back()}
                open={creationStatus !== "stale"}
                onClose={resetStatus}
            />
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Редактирование категории"}
                hasBackIcon
            />
            {
                formData && <FormProvider {...methods}>
                    <Form>
                        <div className={textInputCN}>
                            <ControlledTextInput
                                labelText={"Название категории"}
                                placeholder={"Введите название категории"}
                                name={"name"}
                            />
                        </div>
                        <AdminPanelCharBlock blockName={"properties"}/>
                        <div className={"flex flex-row items-center gap-5"}>
                            <Button
                                disabled={isSubmitting}
                                classNames={{button: "w-[250px]"}}
                                text={isSubmitting ? "Отправка.." : "Сохранить"}
                                onClick={handleSubmit(onSaveChanges)}
                            />
                            {creationStatus === "failure" && (
                                <Text
                                    text={"Возникли ошибки при создании категории"}
                                    className={"text-sm text-red-500"}
                                />
                            )}
                        </div>
                    </Form>
                </FormProvider>
            }
        </React.Fragment>
    );

};

export default AdminEditCategoryPage;
