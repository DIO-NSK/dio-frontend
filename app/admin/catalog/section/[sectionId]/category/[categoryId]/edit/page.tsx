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
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {$currentCategory, editCategoryPageDidMountEvent} from "./model";
import {$creationStatus, createCategoryFx} from "../../../model";
import {useRouter} from "next/navigation";

const AdminEditCategoryPage = ({params}: {
    params: {
        sectionId: number;
        categoryId: number;
    }
}) => {

    const router = useRouter();

    const [
        currentCategory, pageDidMount,
        createCategory, creationStatus,
    ] = useUnit([
        $currentCategory, editCategoryPageDidMountEvent,
        createCategoryFx, $creationStatus,
    ]);

    const methods = useForm<CreateCategoryData>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {...currentCategory},
        mode: "onBlur"
    })

    const {
        formState: {isSubmitting},
        handleSubmit,
    } = methods

    const onSaveChanges = (formData: FieldValues) => {
        const request = {
            sequenceNumber: currentCategory?.sequenceNumber,
            data: formData as CreateCategoryData,
            id: params.sectionId,
        };
        createCategory(request).then((_) => router.back());
    };

    useEffect(() => {
        pageDidMount(params)
    }, [])

    return (
        <>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Новая категория"}
                hasBackIcon
            />
            <FormProvider {...methods}>
                <Form>
                    <div
                        className={
                            "w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"
                        }
                    >
                        <ControlledTextInput
                            labelText={"Название категории"}
                            placeholder={"Введите название категории"}
                            name={"name"}
                        />
                    </div>
                    <AdminPanelCharBlock/>
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
        </>
    );

};

export default AdminEditCategoryPage;
