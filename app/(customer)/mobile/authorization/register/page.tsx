"use client"

import React, {useEffect, useState} from "react";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import Button from "@/components/atoms/buttons/button/Button";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {FiX} from "react-icons/fi";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import Form from "@/components/atoms/form/Form";
import {useUnit} from "effector-react";
import {
    registerPopupDidMountEvent,
    registerUserFx,
    setUserPhoneNumberEvent
} from "@/components/organisms/popups/authorization/signup-popup/model";
import {RegisterUserData, RegisterUserSchema} from "@/schemas/customer/authorization/RegisterUserSchema";
import Text from "@/components/atoms/text/text-base/Text";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import ControlledCaptcha from "@/components/atoms/inputs/controlled-captcha/ControlledCaptcha";
import {useSmartCaptcha} from "@/utlis/hooks/useSmartCaptcha";

const formData: InputPrefilledData[] = [
    {
        labelText: "Телефон",
        placeholder: "+7 (___) ___-__-__",
        inputMask: "+7 (999) 999-99-99",
        name: "phoneNumber"
    }, {
        labelText: "Имя пользователя",
        placeholder: "Иван Иванов",
        name: "fullName"
    }, {
        labelText: "Пароль",
        placeholder: "Введите пароль",
        name: "password",
        isPassword: true
    }
]
const MobileRegisterPage = () => {

    const navigation = useNavigation()

    const [registerUser, setUserPhoneNumber, popupDidMount]
        = useUnit([registerUserFx, setUserPhoneNumberEvent, registerPopupDidMountEvent])

    const methods = useForm<RegisterUserData>({
        resolver: zodResolver(RegisterUserSchema),
        mode: "onSubmit"
    })

    const {formState: {isSubmitting}, trigger, getValues} = methods

    const [captchaVisible, toggleCaptchaVisible, handleValidateForm, key, resetKey] = useSmartCaptcha<RegisterUserData>(['phoneNumber', 'fullName', 'password'], trigger);

    const [error, setError] = useState<string>('')

    const onSubmit = () => {
        const formData = getValues();

        registerUser(formData as RegisterUserData)
            .then(_ => {
                setUserPhoneNumber(formData.phoneNumber)
                navigation.pushDeep('/confirm')
            })
            .catch(setError)
    }

    useEffect(() => {
        popupDidMount()
    }, []);

    return (
        <InnerPageWrapper>
            <HeaderRow
                rightContent={<FiX onClick={navigation.back}/>}
                theme={"bordered"}
                header={"Зарегистрироваться"}
            />
            <FormProvider {...methods}>
                <Form>
                    {formData.map((input, inputKey) =>
                        <ControlledTextInput {...input} key={inputKey}/>
                    )}
                    {error.length !== 0 && <Text
                        className={"text-sm text-red-500"}
                        text={error}
                    />}
                    <section className={"w-full flex flex-col items-center gap-5"}>
                        <Button
                            disabled={isSubmitting}
                            classNames={{button: "w-full"}}
                            onClick={async () => {
                                resetKey();
                                await handleValidateForm();
                            }}
                            text={"Подтвердить номер телефона"}
                        />
                        <TextButton
                            className={"text-base"}
                            onClick={() => navigation.push("/mobile/authorization/legal-entity")}
                            text={"Регистрация юридического лица"}
                        />
                    </section>
                    <ControlledCaptcha
                        key={key}
                        visible={captchaVisible}
                        onChallengeHidden={toggleCaptchaVisible}
                        onSuccess={onSubmit}
                    />
                </Form>
            </FormProvider>
        </InnerPageWrapper>
    );

};

export default MobileRegisterPage;
