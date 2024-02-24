"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import {defaultLegalEntityData, LegalEntityData, LegalEntitySchema} from "@/schemas/LegalEntitySchema";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {FiX} from "react-icons/fi";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import React from "react";

const formData: InputPrefilledData<LegalEntityData>[] = [
    {
        labelText: "Полное название организации",
        placeholder: "Введите название организации",
        name: "companyName"
    },
    {
        labelText: "Юридический адрес",
        placeholder: "Введите адрес",
        name: "legalAddress"
    },
    {
        labelText: "ИНН",
        placeholder: "Введите ИНН",
        name: "ITN"
    },
    {
        labelText: "КПП",
        placeholder: "Введите КПП",
        name: "reasonCode"
    },
    {
        labelText: "Телефон контактного лица",
        inputMask: "+7 (999) 999-99-99",
        placeholder: "+7 (000) 000-00-00",
        name: "contactPerson"
    },
    {
        labelText: "Название банка",
        placeholder: "Введите название банка",
        name: "bankName"
    },
    {
        labelText: "БИК банка",
        placeholder: "Введите БИК банка",
        name: "BIC"
    },
    {
        labelText: "Расчётный счёт",
        placeholder: "Введите расчётный счёт",
        name: "bankAccount"
    },
    {
        labelText: "Корреспондентский счёт",
        placeholder: "Введите корреспондентский счёт",
        name: "correspondingAccount"
    },
]

const MobileLegalEntityPage = () => {

    const navigation = useNavigation()

    const methods = useForm<LegalEntityData>({
        defaultValues: defaultLegalEntityData,
        resolver: zodResolver(LegalEntitySchema),
        mode: "onBlur"
    })

    const onSubmit = (_ : LegalEntityData) => navigation.push("/")

    return (
        <InnerPageWrapper>
            <HeaderRow
                rightContent={<FiX onClick={navigation.back}/>}
                header={"Регистрация для юрлиц"}
                theme={"bordered"}
            />
            <FormProvider {...methods}>
                <Form>
                    {
                        formData.map((input, inputKey) =>
                            <TextInput {...input} key={inputKey}/>
                        )
                    }
                    <Button
                        onClick={methods.handleSubmit(onSubmit)}
                        text={"Войти"}
                    />
                </Form>
            </FormProvider>
        </InnerPageWrapper>
    );

};

export default MobileLegalEntityPage;
