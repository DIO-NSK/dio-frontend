"use client";

import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/buttons/button/Button";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import { changePasswordFx } from "@/components/organisms/popups/authorization/change-password-popup/model";
import { $passwordPhoneNumber } from "@/components/organisms/popups/authorization/forgot-password-popup/model";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import { ChangePasswordData, ChangePasswordSchema } from "@/schemas/customer/authorization/ChangePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

const MobileConfirmPhoneForgotPasswordPage = () => {
  const router = useRouter();

  const [phoneNumber, changePassword] = useUnit([$passwordPhoneNumber, changePasswordFx]);
  const [error, setError] = useState<string>("");

  const methods = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = (fieldValues: FieldValues) => {
    changePassword(fieldValues as ChangePasswordData)
      .then((_) => router.push("/mobile/authorization"))
      .catch((error) => setError(error));
  };

  useEffect(() => {
    if (phoneNumber) {
      methods.reset({ phoneNumber: phoneNumber!! });
    }
  }, [phoneNumber]);

  return (
    <InnerPageWrapper>
      <FormProvider {...methods}>
        <HeaderRow rightContent={<FiX onClick={router.back} />} header={"Новый пароль"} theme={"bordered"} />
        <ControlledTextInput
          labelText={"Новый пароль"}
          placeholder={"Придумайте новый пароль"}
          name={"newPassword"}
          isPassword
        />
        <ControlledTextInput labelText={"Код подтверждения"} placeholder={"0000"} inputMask={"9999"} name={"code"} />
        {error && <Text className={"text-red-500"} text={error} />}
        <Button
          text={methods.formState.isSubmitting ? "Отправка" : "Сменить пароль"}
          disabled={methods.formState.isSubmitting}
          onClick={methods.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </InnerPageWrapper>
  );
};

export default MobileConfirmPhoneForgotPasswordPage;
