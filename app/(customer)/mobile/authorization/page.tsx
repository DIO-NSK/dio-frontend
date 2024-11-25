"use client";

import Button from "@/components/atoms/buttons/button/Button";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/Text/Text";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import { $loginError, loginUserByCredentialsFx } from "@/components/organisms/popups/authorization/login-popup/model";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import { LoginUserData, LoginUserSchema } from "@/schemas/customer/authorization/LoginUserSchema";
import { InputPrefilledData } from "@/types/props/inputs/InputPrefilledData";
import { useNavigation } from "@/utlis/hooks/useNavigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

const formData: InputPrefilledData[] = [
  {
    placeholder: "+7 (000) 000-00-00",
    inputMask: "+7 (999) 999-99-99",
    labelText: "Телефон",
    name: "phoneNumber",
    isPassword: false,
  },
  {
    placeholder: "Введите пароль",
    labelText: "Пароль",
    name: "password",
    isPassword: true,
  },
];

const MobileAuthorizationPage = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [loginUserByCredentials, loginError] = useUnit([loginUserByCredentialsFx, $loginError]);

  const methods = useForm<LoginUserData>({
    resolver: zodResolver(LoginUserSchema),
  });

  const onSubmit = (formData: LoginUserData) => {
    loginUserByCredentials(formData as LoginUserData)
      .then(router.back)
      .catch((e) => e);
  };

  return (
    <InnerPageWrapper>
      <HeaderRow rightContent={<FiX onClick={router.back} />} theme={"bordered"} header={"Войти"} />
      <FormProvider {...methods}>
        <Form className={"gap-4"}>
          {formData.map((input, inputKey) => (
            <ControlledTextInput {...input} key={inputKey} />
          ))}
          <section className={"w-full flex flex-col gap-3 items-center"}>
            {loginError && <Text text={loginError} className={"text-sm text-red-500"} />}
            <Button text={"Войти"} classNames={{ button: "w-full" }} onClick={methods.handleSubmit(onSubmit)} />
            <Button
              buttonType={"SECONDARY"}
              onClick={() => navigation.pushDeep("/register")}
              classNames={{ button: "w-full" }}
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
