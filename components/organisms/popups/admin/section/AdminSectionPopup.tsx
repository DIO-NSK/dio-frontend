import React from 'react';
import {PopupProps} from "@/types/props/Popup";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import Form from "@/components/atoms/form/Form";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {CreateSectionData, CreateSectionSchema} from "@/schemas/admin/CreateSectionSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useUnit} from "effector-react";

import {$createSectionError, createSectionFx} from "@/app/admin/catalog/model"
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";

const AdminSectionPopup = (props: PopupProps) => {

    const [createError, createSection] = useUnit([$createSectionError, createSectionFx])

    const methods = useForm<CreateSectionData>({
        resolver: zodResolver(CreateSectionSchema),
        mode: "onBlur",
    })

    const {
        formState: {isSubmitting},
        handleSubmit,
    } = methods

    const onSubmit = (data: FieldValues) => {
        createSection(data as CreateSectionData)
            .then(_ => props.onClose?.())
            .catch(e => e)
    }

    return (
        <FormProvider {...methods}>
            <PopupWrapper {...props}>
                <div className={"w-[400px] flex flex-col gap-5"}>
                    <Text text={"Создать раздел"} className={"text-[20px] font-medium"}/>
                    <Form className={"gap-5"}>
                        <ControlledTextInput
                            labelText={"Название раздела"}
                            placeholder={"Введите название"}
                            disabled={isSubmitting}
                            name={"section"}
                            hintText={{
                                type : "warning",
                                hintMessage : createError
                            }}
                        />
                        <Button
                            text={isSubmitting ? "Отправка.." : "Подтвердить"}
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                        />
                    </Form>
                </div>
            </PopupWrapper>
        </FormProvider>
    );

};

export default AdminSectionPopup;
