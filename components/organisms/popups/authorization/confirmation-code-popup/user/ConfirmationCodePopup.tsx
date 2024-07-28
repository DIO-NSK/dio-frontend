import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import React, {useState} from "react";
import Text from "@/components/atoms/text/text-base/Text";
import {FormProvider, useForm} from "react-hook-form";
import {UserConfirmCodeData, UserConfirmCodeSchema} from "@/schemas/customer/authorization/UserConfirmCodeSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {sendConfirmationCodeFx} from "@/components/organisms/popups/authorization/confirmation-code-popup/model";
import {$userPhoneNumber} from "@/components/organisms/popups/authorization/signup-popup/model";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import {
    $loginByPhoneNumber,
    loginByPhonePopupDidMountEvent
} from "@/components/organisms/popups/authorization/login-by-phone-popup/model";

const ConfirmationCodePopup = () => {

    const authContext = useAuthorizationPopup()

    const [loginByPhoneNumber, reset] = useUnit([$loginByPhoneNumber, loginByPhonePopupDidMountEvent])
    const [userPhoneNumber, sendConfirmationCode] = useUnit([$userPhoneNumber, sendConfirmationCodeFx])

    const [error, setError] = useState<string>('')

    const methods = useForm<UserConfirmCodeData>({
        defaultValues: {
            phoneNumber: loginByPhoneNumber ?? userPhoneNumber,
            code: "",
        },
        resolver: zodResolver(UserConfirmCodeSchema),
        mode: "onSubmit"
    })

    const {handleSubmit, formState: {isSubmitting}} = methods

    const onSubmit = (formData: UserConfirmCodeData) => {
        sendConfirmationCode(formData)
            .then(_ => {
                authContext.switchPopupState(undefined)
                reset()
            })
            .catch(error => setError(error))
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
                        text={"Вам на телефон придет СМС-уведомление. Введите код входа"}
                        className={"text-text-gray"}
                    />
                    <ControlledTextInput
                        disabled={isSubmitting}
                        labelText={"Код подтверждения"}
                        placeholder={"0000"}
                        inputMask={"9999"}
                        name={"code"}
                    />
                    {error && <Text className={'text-red-500'} text={error}/>}
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

export default ConfirmationCodePopup;
