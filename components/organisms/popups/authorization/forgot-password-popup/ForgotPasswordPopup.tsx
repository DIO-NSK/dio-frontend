import React, {useState} from 'react';
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import Text from "@/components/atoms/text/text-base/Text";
import {PopupProps} from "@/types/props/Popup";
import {Form, FormProvider, useForm} from "react-hook-form";
import {LoginByPhoneData, LoginByPhoneSchema} from "@/schemas/customer/authorization/LoginByPhoneSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";

const ForgotPasswordPopup = (props : PopupProps) => {

    const methods = useForm<LoginByPhoneData>({
        resolver : zodResolver(LoginByPhoneSchema),
        mode : "onBlur"
    })

    const {handleSubmit, formState : {isSubmitting}} = methods

    const [isCodeSent, sendCode] = useState<boolean>(false)
    const onSubmit = () => console.log("Code sent!")

    return (
        <FormProvider {...methods}>
            <PopupWrapper onClose={props.onClose}>
                <Form className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
                    <Text
                        text={"Забыли пароль?"}
                        className={"text-[20px] font-medium"}
                    />
                    <Text
                        text={"Вам на телефон поступит звонок. Введите 4 последних цирфы номера для сброса пароля"}
                        className={"text-text-gray"}
                    />
                    <ControlledTextInput
                        labelText={"Номер телефона"}
                        placeholder={"+_ (___) ___-__-__"}
                        inputMask={"+7 (999) 999-99-99"}
                        name={"phoneNumber"}
                    />
                    {
                        isCodeSent ? <Button
                            text={isSubmitting ? "Отправка.." : "Подтвердить код"}
                            onClick={handleSubmit(onSubmit)}
                        /> : <Button
                            text={isSubmitting ? "Отправка.." : "Отправить код"}
                            onClick={handleSubmit(onSubmit)}
                        />
                    }
                    {
                        isCodeSent && <Button
                            buttonType={"SECONDARY"}
                            text={"Отправить код повторно — 0:59"}
                            onClick={onSubmit}
                        />
                    }
                </Form>
            </PopupWrapper>
        </FormProvider>
    );
};

export default ForgotPasswordPopup;
