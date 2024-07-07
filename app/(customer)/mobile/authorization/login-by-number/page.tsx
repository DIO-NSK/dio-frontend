"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import React, {useEffect, useState} from "react";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react/effector-react.mjs";
import {
    $loginByPhoneError,
    loginByPhoneFx,
    loginByPhonePopupDidMountEvent,
    setLoginByPhoneNumberEvent
} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";
import {FormProvider, useForm} from "react-hook-form";
import {LoginByPhoneData, LoginByPhoneSchema} from "@/schemas/customer/authorization/LoginByPhoneSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import Text from "@/components/atoms/text/text-base/Text";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useSmartCaptcha} from "@/utlis/hooks/useSmartCaptcha";
import ControlledCaptcha from "@/components/atoms/inputs/controlled-captcha/ControlledCaptcha";

const MobileLoginByNumberPage = () => {

    const router = useRouter()

    const setLoginByPhoneNumber = useUnit(setLoginByPhoneNumberEvent)
    const [loginByPhone, popupDidMount, loginByPhoneError]
        = useUnit([loginByPhoneFx, loginByPhonePopupDidMountEvent, $loginByPhoneError])

    const methods = useForm<LoginByPhoneData>({
        resolver: zodResolver(LoginByPhoneSchema),
        mode: "onSubmit"
    })

    const {formState: {isSubmitting}, getValues, trigger} = methods;
    const [captchaVisible, toggleCaptchaVisible, handleValidateForm, key, resetKey] = useSmartCaptcha<LoginByPhoneData>(['phoneNumber'], trigger);
    const [loginMessage, setMessage] = useState<string>('')

    const handleLoginByPassword = () => router.push('/mobile/authorization')

    const onSubmit = () => {
        const {phoneNumber, captchaToken} : LoginByPhoneData = getValues();
        const convertedPhoneNumber = phoneNumber.replace(/[\s()-]/g, '');


        loginByPhone({phoneNumber : convertedPhoneNumber, captchaToken})
            .then(_ => {
                setLoginByPhoneNumber(convertedPhoneNumber)
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
                        onClick={async () => {
                            resetKey();
                            await handleValidateForm();
                        }}
                    />
                    <Button
                        onClick={handleLoginByPassword}
                        text={"Войти с помощью пароля"}
                        buttonType={"SECONDARY"}
                    />
                </div>
                <ControlledCaptcha
                    key={key}
                    visible={captchaVisible}
                    onChallengeHidden={toggleCaptchaVisible}
                    onSuccess={onSubmit}
                />
            </FormProvider>
        </InnerPageWrapper>
    );
};

export default MobileLoginByNumberPage;
