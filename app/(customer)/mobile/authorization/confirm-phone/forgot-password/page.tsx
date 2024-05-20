'use client'

import React, {useEffect, useState} from 'react';
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import Button from "@/components/atoms/buttons/button/Button";
import {useUnit} from "effector-react";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import Text from "@/components/atoms/text/text-base/Text";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {$passwordPhoneNumber} from "@/components/organisms/popups/authorization/forgot-password-popup/model";
import {changePasswordFx} from "@/components/organisms/popups/authorization/change-password-popup/model";
import {ChangePasswordData, ChangePasswordSchema} from "@/schemas/customer/authorization/ChangePasswordSchema";

const MobileConfirmPhoneForgotPasswordPage = () => {

    const router = useRouter()

    const [phoneNumber, changePassword] = useUnit([$passwordPhoneNumber, changePasswordFx])
    const [error, setError] = useState<string>('')

    const methods = useForm<ChangePasswordData>({
        resolver: zodResolver(ChangePasswordSchema),
        mode: 'onBlur'
    })

    const onSubmit = (fieldValues: FieldValues) => {
        changePassword(fieldValues as ChangePasswordData)
            .then(_ => router.push('/mobile/authorization'))
            .catch(error => setError(error))
    }

    useEffect(() => {
        if (phoneNumber) {
            methods.reset({phoneNumber: phoneNumber!!})
        }
    }, [phoneNumber]);

    return (
        <InnerPageWrapper>
            <FormProvider {...methods}>
                <HeaderRow
                    rightContent={<FiX onClick={router.back}/>}
                    header={"Новый пароль"} theme={"bordered"}
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
                {error && <Text className={'text-red-500'} text={error}/>}
                <Button
                    text={methods.formState.isSubmitting ? 'Отправка' : "Сменить пароль"}
                    disabled={methods.formState.isSubmitting}
                    onClick={methods.handleSubmit(onSubmit)}
                />
            </FormProvider>
        </InnerPageWrapper>
    );

};

export default MobileConfirmPhoneForgotPasswordPage;