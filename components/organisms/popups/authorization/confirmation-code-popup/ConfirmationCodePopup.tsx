import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import React from "react";
import Text from "@/components/atoms/text/text-base/Text";
import {FormProvider, useForm} from "react-hook-form";
import {UserConfirmCodeData, UserConfirmCodeSchema} from "@/schemas/customer/UserConfirmCodeSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {useUnit} from "effector-react";
import {sendConfirmationCodeFx} from "@/components/organisms/popups/authorization/confirmation-code-popup/model";
import {$userPhoneNumber} from "@/components/organisms/popups/authorization/signup-popup/model";
import {useAuthorizationPopup} from "@/components/organisms/popups/authorization/useAuthorizationPopup";

const ConfirmationCodePopup = () => {

    const authContext = useAuthorizationPopup()

    const [userPhoneNumber, sendConfirmationCode] =
        useUnit([$userPhoneNumber, sendConfirmationCodeFx])

    const methods = useForm<UserConfirmCodeData>({
        defaultValues: {
            phoneNumber: userPhoneNumber,
            code: "",
        },
        resolver: zodResolver(UserConfirmCodeSchema),
        mode: "onBlur"
    })

    const {handleSubmit, formState: {isSubmitting}} = methods

    const onSubmit = (formData: UserConfirmCodeData) => {
        sendConfirmationCode(formData)
            .then(_ => authContext.switchPopupState(undefined))
            .catch(e => e)
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
                        text={"Вам на телефон поступит звонок. Введите 4 последних цирфы номера для сброса пароля"}
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

export default ConfirmationCodePopup;
