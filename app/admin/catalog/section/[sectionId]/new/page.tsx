"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Button from "@/components/atoms/buttons/button/Button";
import AdminPanelCharBlock from "@/components/organisms/blocks/admin-panel-char-block/AdminPanelCharBlock";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import {
    CreateCategoryData,
    CreateCategorySchema,
    defaultCharacteristicData
} from "@/schemas/admin/CreateCategorySchema";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {useRouter} from "next/navigation";
import {$categories, $creationStatus, createCategoryFx} from "../model";
import Text from "@/components/atoms/text/text-base/Text";

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
                {...defaultCharacteristicData, sequenceNumber: 1},
            ]
        },
        mode: "onBlur"
    })

    const {
        handleSubmit,
        formState: {isSubmitting},
    } = methods

    const onSaveChanges = (formData: FieldValues) => {
        const request = {
            sequenceNumber : categories.length,
            data: formData as CreateCategoryData,
            id: params.sectionId
        }
        createCategory(request).then(_ => router.back())
    }

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
                    <div className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}>
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
                        {
                            creationStatus === "failure" &&
                            <Text text={"Возникли ошибки при создании категории"}
                                  className={"text-sm text-red-500"}
                            />
                        }
                    </div>

                </Form>
            </FormProvider>
        </>
    );
};

export default AdminPanelNewCategoryPage;
