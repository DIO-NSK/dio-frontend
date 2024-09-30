'use client'

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import { SeoData, SeoSchema } from "@/schemas/admin/SeoSchema";
import { Seo } from "@/types/dto/Seo";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FieldValues, Form, FormProvider, useForm } from "react-hook-form";
import { getSeoById } from "../../page.api";
import { staticPages } from "../../page.data";
import { SeoBlock } from "@/components/organisms/seo-block/SeoBlock";
import Button from "@/components/atoms/buttons/button/Button";
import { editSeo } from "./page.api";
import { useRouter } from "next/navigation";

const EditSeoPage = ({ params: { seoId } }: { params: { seoId: number } }) => {
    const router = useRouter();
    const [seo, setSeo] = useState<Seo | undefined>();
    const methods = useForm<SeoData>({
        resolver: zodResolver(SeoSchema)
    })

    const onSubmit = (data: FieldValues) => {
        editSeo({ ...data, id: seoId } as SeoData).then(router.back)
    }

    useEffect(() => {
        getSeoById(seoId).then((seo) => {
            methods.reset({ ...seo, keywords: seo.keywords?.join(',') });
            setSeo(seo);
        });
    }, [seoId]);

    if (seo) return (
        <React.Fragment>
            <HeaderRow
                header={staticPages[Number(seo.id)].name}
                className={"w-full"}
                theme={"bordered"}
                hasBackIcon
            />
            <FormProvider {...methods}>
                <Form>
                    <div className="w-full px-7 pb-7 border-b-2 border-light-gray">
                        <SeoBlock isStatic hintUrl="bonus-program" />
                    </div>
                    <div className={"px-7 pt-7 flex flex-row items-center gap-5"}>
                        <Button
                            text={methods.formState.isSubmitting ? "Отправка.." : "Сохранить"}
                            disabled={methods.formState.isSubmitting}
                            classNames={{ button: "w-[250px]" }}
                            onClick={methods.handleSubmit(onSubmit)}
                        />
                    </div>
                </Form>
            </FormProvider>
        </React.Fragment>
    )
}

export default EditSeoPage;