import React, {useEffect, useState} from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import {
    useChangePasswordPopup
} from "@/components/organisms/popups/authorization/change-password-popup/ChangePasswordPopup.hooks";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangePasswordData, ChangePasswordSchema} from "@/schemas/customer/authorization/ChangePasswordSchema";
import {useUnit} from "effector-react";
import {changePasswordFx} from "@/components/organisms/popups/authorization/change-password-popup/model";
import Snackbar from "@/components/organisms/snackbar/Snackbar";
import {$passwordPhoneNumber} from "@/components/organisms/popups/authorization/forgot-password-popup/model";

const ChangePasswordPopup = () => {

    const [phoneNumber, changePassword] = useUnit([$passwordPhoneNumber, changePasswordFx])
    const [successMessage, setSuccessMessage] = useState<string>('')
    const [error, setError] = useState<string>('')

    const methods = useForm<ChangePasswordData>({
        resolver : zodResolver(ChangePasswordSchema),
        mode : 'onBlur'
    })

    const {...context} = useChangePasswordPopup()

    const onSubmit = (fieldValues : FieldValues) => {
        changePassword(fieldValues as ChangePasswordData)
            .then(_ => setSuccessMessage('Вы можете войти в аккаунт с новым паролем'))
            .catch(error => setError(error))
    }

    useEffect(() => {
        if (phoneNumber) {
            methods.reset({phoneNumber : phoneNumber!!})
        }
    }, [phoneNumber]);

    return (
        <PopupWrapper>
            <Snackbar
                onClose={() => setSuccessMessage('false')}
                message={successMessage}
                header={"Пароль успешно изменён!"}
                open={successMessage !== ''}
                success={true}
            />
            <FormProvider {...methods}>
                <div className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
                    <Text
                        text={"Новый пароль"}
                        className={"text-[20px] font-medium"}
                    />
                    <ControlledTextInput
                        labelText={"Новый пароль"}
                        placeholder={"Придумайте новый пароль"}
                        name={'newPassword'}
                        isPassword
                    />
                    <ControlledTextInput
                        labelText={"Код подтверждения"}
                        placeholder={"0000"}
                        inputMask={'9999'}
                        name={'code'}
                    />
                    <div className={"w-full flex flex-col gap-3"}>
                        <Button
                            disabled={methods.formState.isSubmitting}
                            onClick={methods.handleSubmit(onSubmit)}
                            text={methods.formState.isSubmitting ? 'Отправка' : "Сменить пароль"}
                        />
                        <Button
                            onClick={context.handleLogin}
                            buttonType={"SECONDARY"}
                            text={"Войти заново"}
                        />
                    </div>
                </div>
            </FormProvider>
        </PopupWrapper>
    );
};

export default ChangePasswordPopup;
