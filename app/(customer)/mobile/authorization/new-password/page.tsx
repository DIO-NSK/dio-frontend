"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import {defaultForgotPasswordData, ForgotPasswordData, ForgotPasswordSchema} from "@/schemas/customer/ForgotPasswordSchema";
import Form from "@/components/atoms/form/Form";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {FiX} from "react-icons/fi";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {useNavigation} from "@/utlis/hooks/useNavigation";

const formData: InputPrefilledData[] = [
    {
        labelText: "Новый пароль",
        placeholder: "Придумайте пароль",
        name: "password"
    },
    {
        labelText: "Повторите пароль",
        placeholder: "Наберите пароль заново",
        name: "repeatedPassword"
    }
]

const MobileNewPasswordPage = () => {

    const navigation = useNavigation()

    const methods = useForm<ForgotPasswordData>({
        defaultValues: defaultForgotPasswordData,
        resolver: zodResolver(ForgotPasswordSchema),
        mode: "onBlur"
    })

    const onSubmit = (data: ForgotPasswordData) => console.log(data)

    return (
        <InnerPageWrapper>
            <HeaderRow
                rightContent={<FiX onClick={navigation.back}/>}
                theme={"bordered"}
                header={"Новый пароль"}
            />
            <FormProvider {...methods}>
                <Form>
                    {
                        formData.map((input, inputKey) =>
                            <TextInput {...input} key={inputKey} isPassword/>
                        )
                    }
                    <Button
                        onClick={methods.handleSubmit(onSubmit)}
                        text={"Войти"}
                    />
                </Form>
            </FormProvider>
        </InnerPageWrapper>
    );

};

export default MobileNewPasswordPage;
