import React, {useEffect} from 'react';
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
    $registerUserError, registerPopupDidMountEvent,
    registerUserFx,
    setUserPhoneNumberEvent
} from "@/components/organisms/popups/authorization/signup-popup/model";
import Text from "@/components/atoms/text/text-base/Text";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";

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

    const [registerUser, registerError, setUserPhoneNumber, popupDidMount]
        = useUnit([registerUserFx, $registerUserError, setUserPhoneNumberEvent, registerPopupDidMountEvent])

    const {switchPopupState, ...authContext} = useAuthorizationPopup()

    const methods = useForm<RegisterUserData>({
        resolver: zodResolver(RegisterUserSchema),
        mode: "onBlur"
    })

    const {handleSubmit, formState: {isSubmitting}} = methods

    const onSubmit = (formData: FieldValues) => {
        registerUser(formData as RegisterUserData)
            .then(_ => {
                switchPopupState("confirmationCode")
                setUserPhoneNumber(formData.phoneNumber)
            })
            .catch(e => e)
    }

    const handleRegisterLegalEntity = () => console.log("Register Legal entity")

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
                    {
                        inputData.map((input, key) => (
                            <ControlledTextInput disabled={isSubmitting} key={key} {...input}/>
                        ))
                    }
                    <div className={"w-full flex flex-col items-center gap-5"}>
                        {
                            registerError && <Text
                                text={registerError}
                                className={"text-sm text-red-500"}
                            />
                        }
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
