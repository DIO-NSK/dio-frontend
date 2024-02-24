"use client"

import React from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {defaultRegisterSchema, RegisterData, RegisterSchema} from "@/schemas/RegisterSchema";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {FiX} from "react-icons/fi";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import Form from "@/components/atoms/form/Form";

const formData: (InputPrefilledData<keyof RegisterData> & { isPassword: boolean })[] = [
    {
        placeholder: "+7 (000) 000-00-00",
        inputMask: "+7 (999) 999-99-99",
        labelText: "Телефон", name: "phoneNumber",
        isPassword: false,
    }, {
        placeholder: "Иван Иванов",
        labelText: "Имя пользователя", name: "username",
        isPassword: false,
    }, {
        placeholder: "Введите пароль",
        labelText: "Пароль", name: "password",
        isPassword: true
    },
]

const MobileRegisterPage = () => {

    const navigation = useNavigation()

    const methods = useForm<RegisterData>({
        defaultValues: defaultRegisterSchema,
        resolver: zodResolver(RegisterSchema),
        mode: "onBlur"
    })

    const onSubmit = (data: RegisterData) => console.log(data)

    return (
        <InnerPageWrapper>
            <HeaderRow
                rightContent={<FiX onClick={navigation.back}/>}
                theme={"bordered"}
                header={"Зарегистрироваться"}
            />
            <FormProvider {...methods}>
                <Form>
                    {
                        formData.map((input, inputKey) =>
                            <TextInput {...input} key={inputKey}/>
                        )
                    }
                    <section className={"w-full flex flex-col items-center gap-5"}>
                        <Button
                            onClick={methods.handleSubmit(onSubmit)}
                            text={"Подтвердить номер телефона"}
                        />
                        <TextButton
                            className={"text-base"}
                            onClick={() => navigation.push("/mobile/authorization/legal-entity")}
                            text={"Регистрация юридического лица"}
                        />
                    </section>
                </Form>
            </FormProvider>
        </InnerPageWrapper>
    );

};

export default MobileRegisterPage;
