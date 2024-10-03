'use client'

import { editSectionEvent, saveChangesEvent } from "@/app/admin/catalog/model";
import Button from "@/components/atoms/buttons/button/Button";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import { SeoBlock } from "@/components/organisms/seo-block/SeoBlock";
import { CreateSectionData, CreateSectionSchema } from "@/schemas/admin/CreateSectionSchema";
import { Section } from "@/types/dto/Section";
import { Maybe } from "@/types/props/utils/Maybe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { getSectionById } from "./page.api";

const EditSectionPage = ({ params: { sectionId } }: { params: { sectionId: number } }) => {
    const [section, setSection] = useState<Maybe<Section>>(undefined);
    const [editSection, saveChanges] = useUnit([editSectionEvent, saveChangesEvent])
    const router = useRouter();

    const methods = useForm<CreateSectionData>({
        resolver: zodResolver(CreateSectionSchema),
        mode: "onSubmit",
    })

    useEffect(() => {
        getSectionById(sectionId).then(setSection);
    }, [sectionId]);

    useEffect(() => {
        methods.reset({ section: section?.name })
    }, [section]);

    const {
        formState: { isSubmitting },
        handleSubmit,
    } = methods

    const onSubmit = (data: FieldValues) => {
        editSection({ sectionId: sectionId, payload: data as CreateSectionData })
        saveChanges()
        router.back();
    }

    return (
        <React.Fragment>
            <HeaderRow
                className={"w-full"}
                theme={"bordered"}
                header={section?.name ?? ''}
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
                        <SeoBlock seoId={(section as any)?.seo?.id} hintUrl="vody" />
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

export default EditSectionPage;