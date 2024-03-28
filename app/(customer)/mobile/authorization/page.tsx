"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import Form from "@/components/atoms/form/Form";
import {FormProvider, useForm} from "react-hook-form";
import {LoginUserData, LoginUserSchema} from "@/schemas/customer/authorization/LoginUserSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Button from "@/components/atoms/buttons/button/Button";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {useUnit} from "effector-react";
import {$loginError, loginUserByCredentialsFx} from "@/components/organisms/popups/authorization/login-popup/model";
import {useRouter} from "next/navigation";
import Text from "@/components/atoms/text/text-base/Text";
import React from "react";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";

const formData: InputPrefilledData[] = [
    {
        placeholder: "+7 (000) 000-00-00",
        inputMask: "+7 (999) 999-99-99",
        labelText: "Телефон", name: "phoneNumber",
        isPassword: false,
    }, {
        placeholder: "Введите пароль",
        labelText: "Пароль", name: "password",
        isPassword: true
    },
]

const MobileAuthorizationPage = () => {

    const navigation = useNavigation()
    const router = useRouter()
    const [loginUserByCredentials, loginError] = useUnit([loginUserByCredentialsFx, $loginError])

    const methods = useForm<LoginUserData>({
        resolver: zodResolver(LoginUserSchema)
    })

    const onSubmit = (formData: LoginUserData) => {
        loginUserByCredentials(formData as LoginUserData)
            .then(_ => router.push("/"))
            .catch(e => e)
    }

    return (
        <InnerPageWrapper>
            <HeaderRow
                rightContent={<FiX onClick={router.back}/>}
                theme={"bordered"}
                header={"Войти"}
            />
            <FormProvider {...methods}>
                <Form className={"gap-4"}>
                    {formData.map((input, inputKey) =>
                        <ControlledTextInput {...input} key={inputKey}/>
                    )}
                    <section className={"w-full flex flex-col gap-3 items-center"}>
                        {loginError && <Text
                            text={loginError}
                            className={"text-sm text-red-500"}
                        />}
                        <Button
                            text={"Войти"}
                            classNames={{button: "w-full"}}
                            onClick={methods.handleSubmit(onSubmit)}
                        />
                        <Button
                            buttonType={"SECONDARY"}
                            onClick={() => navigation.pushDeep("/register")}
                            classNames={{button: "w-full"}}
                            text={"Зарегистрироваться"}
                        />
                        <div className={"w-full pt-4 flex flex-col items-center gap-3"}>
                            <TextButton
                                text={"Войти по номеру телефона"}
                                className={"text-base"}
                                onClick={() => navigation.pushDeep("/login-by-number")}
                            />
                            <TextButton
                                text={"Забыли пароль?"}
                                className={"text-base"}
                                onClick={() => navigation.pushDeep("/forgot-password")}
                            />
                        </div>
                    </section>
                </Form>
            </FormProvider>
        </InnerPageWrapper>
    );
};

export default MobileAuthorizationPage;
