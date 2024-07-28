import React, {useEffect, useState} from 'react';
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import {
    useLoginByPhonePopup
} from "@/components/organisms/popups/authorization/login-by-phone-popup/LoginByPhonePopup.hooks";
import {Form, FormProvider, useForm} from "react-hook-form";
import {LoginByPhoneData, LoginByPhoneSchema} from "@/schemas/customer/authorization/LoginByPhoneSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/text/text-base/Text";
import {useUnit} from "effector-react/effector-react.mjs";
import {
    loginByPhoneFx,
    loginByPhonePopupDidMountEvent,
    setLoginByPhoneNumberEvent
} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";
import ControlledCaptcha from "@/components/atoms/inputs/controlled-captcha/ControlledCaptcha";
import {useSmartCaptcha} from "@/utlis/hooks/useSmartCaptcha";

const LoginByPhonePopup = () => {

    const [loginByPhone, popupDidMount, setLoginByPhoneNumber] = useUnit([loginByPhoneFx, loginByPhonePopupDidMountEvent, setLoginByPhoneNumberEvent])

    const methods = useForm<LoginByPhoneData>({
        resolver: zodResolver(LoginByPhoneSchema),
        mode: "onSubmit"
    })

    const {formState: {isSubmitting}, getValues, trigger} = methods

    const [loginMessage, setMessage] = useState<string>('')
    const [captchaVisible, toggleCaptchaVisible, handleValidateForm, key, resetKey] = useSmartCaptcha<LoginByPhoneData>(['phoneNumber'], trigger);

    const {...authContext} = useAuthorizationPopup()
    const {...loginContext} = useLoginByPhonePopup()

    const onSubmit = () => {
        const {phoneNumber, captchaToken} : LoginByPhoneData = getValues();
        const convertedPhoneNumber = phoneNumber.replace(/[\s()-]/g, '');

        loginByPhone({phoneNumber : convertedPhoneNumber, captchaToken})
            .then(_ => {
                authContext.switchPopupState("confirmationCodeByPhone")
                setLoginByPhoneNumber(convertedPhoneNumber)
            })
            .catch(message => setMessage(message))
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
                        {loginMessage ? <Text
                            text={loginMessage.replace('phoneNumber:', '')}
                            className={"text-sm text-red-500"}
                        /> : null}
                        <Button
                            text={isSubmitting ? "Отправка.." : "Подтвердить номер телефона"}
                            onClick={async () => {
                                resetKey();
                                await handleValidateForm();
                            }}
                        />
                        <Button
                            disabled={methods.formState.isSubmitting}
                            onClick={loginContext.handleLoginByPassword}
                            text={methods.formState.isSubmitting ? "Отправка.." : "Войти с помощью пароля"}
                            buttonType={"SECONDARY"}
                        />
                    </div>
                    <ControlledCaptcha
                        key={key}
                        onChallengeHidden={toggleCaptchaVisible}
                        visible={captchaVisible}
                        onSuccess={onSubmit}
                    />
                </Form>
            </PopupWrapper>
        </FormProvider>
    );

};

export default LoginByPhonePopup;
