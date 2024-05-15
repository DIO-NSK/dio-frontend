import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import React from "react";
import Text from "@/components/atoms/text/text-base/Text";
import {FormProvider, useForm} from "react-hook-form";
import {UserConfirmCodeData, UserConfirmCodeSchema} from "@/schemas/customer/authorization/UserConfirmCodeSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import {
    $loginByPhoneNumber,
    loginByPhonePopupDidMountEvent
} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";
import {
    sendConfirmationCodeByPhoneFx
} from "@/components/organisms/popups/authorization/confirmation-code-popup/by-phone/model";

const ConfirmationCodeByPhonePopup = () => {

    const authContext = useAuthorizationPopup()

    const [loginByPhoneNumber, reset, sendCode]
        = useUnit([$loginByPhoneNumber, loginByPhonePopupDidMountEvent, sendConfirmationCodeByPhoneFx])

    const methods = useForm<UserConfirmCodeData>({
        defaultValues: {
            phoneNumber: loginByPhoneNumber!!,
            code: "",
        },
        resolver: zodResolver(UserConfirmCodeSchema),
        mode: "onSubmit"
    })

    const {handleSubmit, formState: {isSubmitting}} = methods

    const onSubmit = (formData: UserConfirmCodeData) => {
        sendCode(formData)
            .then(_ => {
                authContext.switchPopupState(undefined)
                reset()
            })
    }

    return (
        <FormProvider {...methods}>
            <PopupWrapper>
                <Form className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
                    <Text
                        text={"Подтверждение номера телефона"}
                        className={"text-[20px] font-medium"}
                    />
                    <Text
                        text={"Вам на телефон придет СМС-уведомление. Введите код для сброса пароля"}
                        className={"text-text-gray"}
                    />
                    <ControlledTextInput
                        disabled={isSubmitting}
                        labelText={"Код подтверждения"}
                        placeholder={"0000"}
                        inputMask={"9999"}
                        name={"code"}
                    />
                    <Button
                        text={isSubmitting ? "Отправка.." : "Войти"}
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                    />
                </Form>
            </PopupWrapper>
        </FormProvider>
    );
};

export default ConfirmationCodeByPhonePopup;
