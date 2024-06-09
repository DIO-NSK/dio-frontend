"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import AdminPanelCharBlock from "@/components/organisms/blocks/admin-panel-char-block/AdminPanelCharBlock";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import {CreateCategoryData, CreateCategorySchema} from "@/schemas/admin/CreateCategorySchema";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {useRouter} from "next/navigation";
import {$categories, $creationStatus, createCategoryFx} from "../model";
import Text from "@/components/atoms/text/text-base/Text";
import {defaultCharacteristicData} from "@/schemas/dto/CharacteristicSchema";
import React from "react";
import AdminPhotoCard from "@/components/organisms/cards/admin-photo-card/AdminPhotoCard";
import FileURLInput from "@/components/atoms/inputs/file-input/FileURLInput";

const AdminPanelNewCategoryPage = ({params}: {
    params: { sectionId: number }
}) => {

    const router = useRouter()

    const [
        categories,
        createCategory,
        creationStatus
    ] = useUnit([$categories, createCategoryFx, $creationStatus])

    const methods = useForm<CreateCategoryData>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: {
            name: "",
            properties: [
                defaultCharacteristicData,
                {...defaultCharacteristicData, sequenceNumber: 2},
            ]
        },
        mode: "onSubmit"
    })

    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods

    const onSaveChanges = (formData: FieldValues) => {
        const request = {
            sequenceNumber: categories.length + 1,
            data: formData as CreateCategoryData,
            id: params.sectionId
        }
        createCategory(request)
            .then(_ => router.back())
    }

    methods.watch()

    return (
        <React.Fragment>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Новая категория"}
                hasBackIcon
            />
            <FormProvider {...methods}>
                <Form>
                    <div className={"w-full px-7 pb-7 border-b-2 border-light-gray"}>
                        <ControlledTextInput
                            labelText={"Название категории"}
                            placeholder={"Введите название категории"}
                            name={"name"}
                        />
                    </div>
                    <div className={"w-full px-7 pb-7 border-b-2 border-light-gray flex flex-col gap-3"}>
                        <Text text={'Фотография категории'}/>
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
                    <AdminPanelCharBlock blockName={"properties"}/>
                    <div className={"px-7 flex flex-row items-center gap-5"}>
                        <Button
                            disabled={isSubmitting}
                            classNames={{button: "w-[250px]"}}
                            text={isSubmitting ? "Отправка.." : "Сохранить"}
                            onClick={handleSubmit(onSaveChanges)}
                        />
                        {
                            creationStatus === "failure" &&
                            <Text text={"Возникли ошибки при создании категории"}
                                  className={"text-sm text-red-500"}
                            />
                        }
                    </div>

                </Form>
            </FormProvider>
        </React.Fragment>
    );
};

export default AdminPanelNewCategoryPage;
