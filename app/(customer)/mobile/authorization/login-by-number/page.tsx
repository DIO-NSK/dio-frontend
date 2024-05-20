"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import React, {useEffect, useState} from "react";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react/effector-react.mjs";
import {
    $loginByPhoneError,
    loginByPhoneFx, loginByPhonePopupDidMountEvent,
    setLoginByPhoneNumberEvent
} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {LoginByPhoneData, LoginByPhoneSchema} from "@/schemas/customer/authorization/LoginByPhoneSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import Text from "@/components/atoms/text/text-base/Text";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";

const MobileLoginByNumberPage = () => {

    const router = useRouter()

    const setLoginByPhoneNumber = useUnit(setLoginByPhoneNumberEvent)
    const [loginByPhone, popupDidMount, loginByPhoneError]
        = useUnit([loginByPhoneFx, loginByPhonePopupDidMountEvent, $loginByPhoneError])

    const methods = useForm<LoginByPhoneData>({
        resolver: zodResolver(LoginByPhoneSchema),
        mode: "onSubmit"
    })

    const [loginMessage, setMessage] = useState<string>('')

    const {handleSubmit, formState: {isSubmitting}} = methods

    const handleLoginByPassword = () => router.push('/mobile/authorization')

    const onSubmit = (formData: FieldValues) => {
        loginByPhone(formData as LoginByPhoneData)
            .then(_ => {
                setLoginByPhoneNumber((formData as LoginByPhoneData).phoneNumber)
                router.push('/mobile/authorization/confirm-phone/by-phone')
            })
            .catch(message => setMessage(message))
    }

    useEffect(() => {
        popupDidMount()
    }, []);

    return (
        <InnerPageWrapper classNames={{mobileWrapper : "gap-5"}}>
            <FormProvider {...methods}>
                <HeaderRow
                    rightContent={<FiX onClick={router.back}/>}
                    leftContent={"По номеру"}
                    theme={"bordered"}
                    header={"Войти"}
                />
                <ControlledTextInput
                    labelText={"Телефон"}
                    placeholder={"+7 (___) ___-__-__"}
                    inputMask={"+7 (999) 999-99-99"}
                    disabled={isSubmitting}
                    name={"phoneNumber"}
                />
                <div className={"w-full flex flex-col gap-3"}>
                    {loginMessage && <Text
                        className={"text-sm text-red-500"}
                        text={loginByPhoneError}
                    />}
                    <Button
                        text={isSubmitting ? "Отправка.." : "Подтвердить номер телефона"}
                        onClick={handleSubmit(onSubmit)}
                    />
                    <Button
                        onClick={handleLoginByPassword}
                        text={"Войти с помощью пароля"}
                        buttonType={"SECONDARY"}
                    />
                </div>
            </FormProvider>
        </InnerPageWrapper>
    );
};

export default MobileLoginByNumberPage;
