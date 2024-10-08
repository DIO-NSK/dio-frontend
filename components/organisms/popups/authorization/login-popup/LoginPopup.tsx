"use client"

import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import {useLoginPopup} from "@/components/organisms/popups/authorization/login-popup/LoginPopup.hooks";
import Button from "@/components/atoms/buttons/button/Button";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {LoginUserData, LoginUserSchema} from "@/schemas/customer/authorization/LoginUserSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect} from "react";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {
    $loginError,
    loginPopupDidMountEvent,
    loginUserByCredentialsFx
} from "@/components/organisms/popups/authorization/login-popup/model";
import {useUnit} from "effector-react";
import Text from "@/components/atoms/text/text-base/Text";

const LoginPopup = () => {
    const loginContext = useLoginPopup()
    const authContext = useAuthorizationPopup()
    const [loginUserByCredentials, popupDidMount, loginError] = useUnit([loginUserByCredentialsFx, loginPopupDidMountEvent, $loginError])

    const methods = useForm<LoginUserData>({
        resolver: zodResolver(LoginUserSchema),
        mode: "onSubmit"
    })

    const {handleSubmit, formState: {isSubmitting}} = methods;

    const onSubmit = (formData : FieldValues) => {
        loginUserByCredentials(formData as LoginUserData)
            .then(_ => authContext.switchPopupState(undefined))
            .catch(e => e)
    }

    useEffect(() => {
        popupDidMount()
    }, [])

    return (
        <FormProvider {...methods}>
            <PopupWrapper>
                <Form className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
                    <MultiselectButton
                        activeElement={authContext.multiselectElements[0]}
                        elements={authContext.multiselectElements}
                        selectElement={authContext.handleSelectElement}
                    />
                    <ControlledTextInput
                        disabled={isSubmitting}
                        labelText={"Телефон"}
                        placeholder={"+7 (___) ___-__-__"}
                        inputMask={"+7 (999) 999-99-99"}
                        name={"phoneNumber"}
                    />
                    <ControlledTextInput
                        disabled={isSubmitting}
                        labelText={"Пароль"}
                        placeholder={"Введите пароль"}
                        name={"password"}
                        isPassword
                    />
                    <div className={"w-full flex flex-col items-center gap-5"}>
                        {loginError && <Text
                            text={loginError}
                            className={"text-sm text-red-500"}
                        />}
                        <div className={"w-full flex flex-col gap-3"}>
                            <Button
                                text={isSubmitting ? "Отправка.." : "Войти"}
                                onClick={handleSubmit(onSubmit)}
                                disabled={isSubmitting}
                            />
                            <Button
                                onClick={loginContext.handleLoginByPhoneClick}
                                text={"Войти с помощью номера телефона"}
                                buttonType={"SECONDARY"}
                            />
                        </div>
                        <TextButton
                            onClick={loginContext.handleForgotPasswordClick}
                            text={"Забыли пароль?"}
                        />
                    </div>
                </Form>
            </PopupWrapper>
        </FormProvider>
    );
};

export default LoginPopup;
