import React, {useEffect} from 'react';
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import {
    useLoginByPhonePopup
} from "@/components/organisms/popups/authorization/login-by-phone-popup/LoginByPhonePopup.hooks";
import {FieldValues, Form, FormProvider, useForm} from "react-hook-form";
import {LoginByPhoneData, LoginByPhoneSchema} from "@/schemas/customer/authorization/LoginByPhoneSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/text/text-base/Text";
import {useUnit} from "effector-react/effector-react.mjs";
import {
    $loginByPhoneError,
    loginByPhoneFx, loginByPhonePopupDidMountEvent
} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";

const LoginByPhonePopup = () => {

    const [loginByPhone, popupDidMount, loginByPhoneError]
        = useUnit([loginByPhoneFx, loginByPhonePopupDidMountEvent, $loginByPhoneError])

    const methods = useForm<LoginByPhoneData>({
        resolver : zodResolver(LoginByPhoneSchema),
        mode : "onBlur"
    })

    const {handleSubmit, formState : {isSubmitting}} = methods

    const {...authContext} = useAuthorizationPopup()
    const {...loginContext} = useLoginByPhonePopup()

    const onSubmit = (formData : FieldValues) => {
        loginByPhone(formData as LoginByPhoneData)
            .then(_ => authContext.switchPopupState(undefined))
            .catch(e => e)
    }

    useEffect(() => {
        popupDidMount()
    }, []);

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
                        labelText={"Телефон"}
                        placeholder={"+7 (___) ___-__-__"}
                        inputMask={"+7 (999) 999-99-99"}
                        disabled={isSubmitting}
                        name={"phoneNumber"}
                    />
                    <div className={"w-full flex flex-col gap-3"}>
                        {
                            loginByPhoneError && <Text
                                text={loginByPhoneError}
                                className={"text-sm text-red-500"}
                            />
                        }
                        <Button
                            text={isSubmitting ? "Отправка.." : "Подтвердить номер телефона"}
                            onClick={handleSubmit(onSubmit)}
                        />
                        <Button
                            buttonType={"SECONDARY"}
                            text={"Войти с помощью пароля"}
                            onClick={loginContext.handleLoginByPassword}
                        />
                    </div>
                </Form>
            </PopupWrapper>
        </FormProvider>
    );

};

export default LoginByPhonePopup;
