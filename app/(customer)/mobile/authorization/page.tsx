"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import Form from "@/components/atoms/form/Form";
import {FormProvider, useForm} from "react-hook-form";
import {defaultLoginSchema, LoginData, LoginSchema} from "@/schemas/customer/LoginSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import Button from "@/components/atoms/buttons/button/Button";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import {useNavigation} from "@/utlis/hooks/useNavigation";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";

const formData: (InputPrefilledData<LoginData> & { isPassword: boolean })[] = [
    {
        placeholder: "+7 (000) 000-00-00",
        inputMask: "+7 (999) 999-99-99",
        labelText: "Телефон", valueName: "phoneNumber",
        isPassword: false,
    }, {
        placeholder: "Введите пароль",
        labelText: "Пароль", valueName: "password",
        isPassword: false
    },
]

const MobileAuthorizationPage = () => {

    const navigation = useNavigation()

    const methods = useForm<LoginData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: defaultLoginSchema,
        mode: "onBlur"
    })

    const onSubmit = (data: LoginData) => console.log(data)

    return (
        <InnerPageWrapper>
            <HeaderRow
                rightContent={<FiX onClick={navigation.back}/>}
                theme={"bordered"}
                header={"Войти"}
            />
            <FormProvider {...methods}>
                <Form className={"gap-4"}>
                    {
                        formData.map((input, inputKey) =>
                            <TextInput {...input} key={inputKey}/>
                        )
                    }
                    <section className={"w-full flex flex-col gap-3 items-center"}>
                        <Button
                            text={"Войти"}
                            classNames={{button : "w-full"}}
                            onClick={methods.handleSubmit(onSubmit)}
                        />
                        <Button
                            buttonType={"SECONDARY"}
                            onClick={() => navigation.pushDeep("/register")}
                            classNames={{button : "w-full"}}
                            text={"Зарегистрироваться"}
                        />
                        <div className={"w-full pt-4 flex flex-col items-center gap-3"}>
                            <TextButton
                                text={"Войти по номеру телефона"}
                                className={"text-base"}
                                onClick={() => navigation.pushDeep("/login-by-number")}
                            />
                            <TextButton
                                text={"Забыли пароль?"}
                                className={"text-base"}
                                onClick={() => navigation.pushDeep("/forgot-password")}
                            />
                        </div>
                    </section>
                </Form>
            </FormProvider>
        </InnerPageWrapper>
    );
};

export default MobileAuthorizationPage;
