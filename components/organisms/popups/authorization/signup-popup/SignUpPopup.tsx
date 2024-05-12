import React, {useEffect, useState} from 'react';
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import Button from "@/components/atoms/buttons/button/Button";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {RegisterUserData, RegisterUserSchema} from "@/schemas/customer/authorization/RegisterUserSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import {useUnit} from "effector-react";
import {
    registerPopupDidMountEvent,
    registerUserFx,
    setUserPhoneNumberEvent
} from "@/components/organisms/popups/authorization/signup-popup/model";
import Text from "@/components/atoms/text/text-base/Text";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import {useRouter} from "next/navigation";

const inputData: InputPrefilledData[] = [
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

const SignUpPopup = () => {

    const router = useRouter()

    const [registerUser, setUserPhoneNumber, popupDidMount]
        = useUnit([registerUserFx, setUserPhoneNumberEvent, registerPopupDidMountEvent])

    const {switchPopupState, ...authContext} = useAuthorizationPopup()

    const methods = useForm<RegisterUserData>({
        resolver: zodResolver(RegisterUserSchema),
        mode: "onSubmit"
    })

    const {handleSubmit, formState: {isSubmitting}} = methods

    const [error, setError] = useState<string>('')

    const onSubmit = (formData: FieldValues) => {
        registerUser(formData as RegisterUserData)
            .then(_ => {
                switchPopupState("confirmationCode")
                setUserPhoneNumber(formData.phoneNumber)
            })
            .catch(setError)
    }

    const handleRegisterLegalEntity = () => {
        router.push('/register/legal-entity')
        switchPopupState(undefined)
    }

    useEffect(() => {
        popupDidMount()
    }, []);

    return (
        <FormProvider {...methods}>
            <PopupWrapper>
                <Form className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
                    <MultiselectButton
                        activeElement={authContext.multiselectElements[1]}
                        elements={authContext.multiselectElements}
                        selectElement={authContext.handleSelectElement}
                    />
                    {inputData.map((input, key) => (
                        <ControlledTextInput disabled={isSubmitting} key={key} {...input}/>
                    ))}
                    <div className={"w-full flex flex-col items-center gap-5"}>
                        {error.length !== 0 && <Text
                            className={"text-sm text-red-500"}
                            text={error}
                        />}
                        <Button
                            disabled={isSubmitting}
                            classNames={{button: "w-full"}}
                            text={"Подтвердить номер телефона"}
                            onClick={handleSubmit(onSubmit)}
                        />
                        <TextButton
                            onClick={handleRegisterLegalEntity}
                            text={"Регистрация юридического лица"}
                        />
                    </div>
                </Form>
            </PopupWrapper>
        </FormProvider>
    )

};

export default SignUpPopup;
