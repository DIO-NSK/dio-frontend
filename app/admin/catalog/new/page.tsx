'use client'

import { $createSectionError, createSectionFx } from "@/app/admin/catalog/model";
import Button from "@/components/atoms/buttons/button/Button";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import { SeoBlock } from "@/components/organisms/seo-block/SeoBlock";
import { CreateSectionData, CreateSectionSchema } from "@/schemas/admin/CreateSectionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";

const NewSectionPage = () => {
    const router = useRouter()
    const [createError, createSection] = useUnit([$createSectionError, createSectionFx])

    const methods = useForm<CreateSectionData>({
        resolver: zodResolver(CreateSectionSchema),
        mode: "onSubmit",
    })

    const {
        formState: { isSubmitting },
        handleSubmit,
    } = methods

    const onSubmit = (data: FieldValues) => {
        createSection(data as CreateSectionData)
            .then(router.back)
            .catch(console.log)
    }

    return (
        <React.Fragment>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={"Новый раздел"}
                hasBackIcon
            />
            <FormProvider {...methods}>
                <Form>
                    <div className={"w-full px-7 pb-7 border-b-2 border-light-gray"}>
                        <ControlledTextInput
                            labelText={"Название раздела"}
                            placeholder={"Введите название категории"}
                            name={"section"}
                        />
                    </div>
                    <div className="w-full px-7 pb-7 border-b-2 border-light-gray">
                        <SeoBlock hintUrl="vody" />
                    </div>
                    <div className={"px-7 flex flex-row items-center gap-5"}>
                        <Button
                            disabled={isSubmitting}
                            classNames={{ button: "w-[250px]" }}
                            text={isSubmitting ? "Отправка.." : "Сохранить"}
                            onClick={handleSubmit(onSubmit)}
                        />
                    </div>
                </Form>
            </FormProvider>
        </React.Fragment>
    );
}

export default NewSectionPage;