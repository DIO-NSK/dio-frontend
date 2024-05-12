"use client"

import {useUnit} from "effector-react";
import {useRouter} from "next/navigation";
import {FormProvider, useForm} from "react-hook-form";
import {UserConfirmCodeData, UserConfirmCodeSchema} from "@/schemas/customer/authorization/UserConfirmCodeSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {$userPhoneNumber} from "@/components/organisms/popups/authorization/signup-popup/model";
import {sendConfirmationCodeFx} from "@/components/organisms/popups/authorization/confirmation-code-popup/model";

const MobileRegisterConfirmPage = () => {

    const router = useRouter()

    const [userPhoneNumber, sendConfirmationCode] =
        useUnit([$userPhoneNumber, sendConfirmationCodeFx])

    const methods = useForm<UserConfirmCodeData>({
        defaultValues: {
            phoneNumber: userPhoneNumber,
            code: "",
        },
        resolver: zodResolver(UserConfirmCodeSchema),
        mode: "onSubmit"
    })

    const {handleSubmit, formState: {isSubmitting}} = methods

    const onSubmit = (formData: UserConfirmCodeData) => {
        sendConfirmationCode(formData)
            .then(_ => router.push('/mobile/authorization/registration-success'))
            .catch(e => e)
    }

    return (
        <FormProvider {...methods}>
            <InnerPageWrapper>
                <HeaderRow
                    rightContent={<FiX onClick={router.back}/>}
                    header={"Подтверждение номера"}
                    theme={"bordered"}
                />
                <ControlledTextInput
                    disabled={isSubmitting}
                    labelText={"Код подтверждения"}
                    placeholder={"0000"}
                    inputMask={"9999"}
                    name={"code"}
                />
                <Button
                    classNames={{button : 'w-full'}}
                    text={isSubmitting ? "Отправка.." : "Подтвердить"}
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                />
            </InnerPageWrapper>
        </FormProvider>
    );

};

export default MobileRegisterConfirmPage;