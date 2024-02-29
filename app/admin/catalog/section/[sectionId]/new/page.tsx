"use client"

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useEffect} from "react";
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
import {$isCreateSuccess, pageDidMountEvent, submitFormEvent} from "@/models/admin/category";
import {useRouter} from "next/navigation";

const AdminPanelNewCategoryPage = ({params} : {
    params : {sectionId : number}
}) => {

    const router = useRouter()

    const [
        pageDidMount, isCreationSuccess, submitForm
    ] = useUnit([pageDidMountEvent, $isCreateSuccess, submitFormEvent])

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
        submitForm(formData as CreateCategoryData)
        if (isCreationSuccess) router.back()
    }

    useEffect(() => {
        pageDidMount(params.sectionId)
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
                    <div className={"w-full mx-[-28px] px-7 pb-7 border-b-2 border-light-gray"}>
                        <ControlledTextInput
                            labelText={"Название категории"}
                            placeholder={"Введите название категории"}
                            name={"name"}
                        />
                    </div>
                    <AdminPanelCharBlock/>
                    <Button
                        disabled={isSubmitting}
                        classNames={{button: "w-[250px]"}}
                        text={isSubmitting ? "Отправка.." : "Сохранить"}
                        onClick={handleSubmit(onSaveChanges)}
                    />
                </Form>
            </FormProvider>
        </>
    );
};

export default AdminPanelNewCategoryPage;
