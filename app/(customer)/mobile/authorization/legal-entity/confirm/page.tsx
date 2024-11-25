"use client";

import {
  $firstStepData,
  sendLegalConfirmationCodeFx,
} from "@/app/(customer)/(site)/(inner-pages)/register/legal-entity/model";
import Button from "@/components/atoms/buttons/button/Button";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/Text/Text";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import { UserConfirmCodeData, UserConfirmCodeSchema } from "@/schemas/customer/authorization/UserConfirmCodeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

const MobileLegalEntityConfirmPage = () => {
  const router = useRouter();

  const firstStepData = useUnit($firstStepData);
  const sendConfirmationCode = useUnit(sendLegalConfirmationCodeFx);

  const [reqFailMessage, setReqFailMessage] = useState<string>("");

  const methods = useForm<UserConfirmCodeData>({
    resolver: zodResolver(UserConfirmCodeSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    methods.reset({ phoneNumber: firstStepData?.phoneNumber });
  }, []);

  const onSubmit = (formData: UserConfirmCodeData) => {
    setReqFailMessage("");
    sendConfirmationCode(formData)
      .then((_) => router.push("/mobile/authorization/registration-success"))
      .catch((error) => setReqFailMessage(error.message));
  };

  return (
    <FormProvider {...methods}>
      <InnerPageWrapper>
        <HeaderRow rightContent={<FiX onClick={router.back} />} header={"Подтверждение номера"} theme={"bordered"} />
        <ControlledTextInput
          disabled={isSubmitting}
          labelText={"Код подтверждения"}
          placeholder={"0000"}
          inputMask={"9999"}
          name={"code"}
        />
        <Button
          classNames={{ button: "w-full" }}
          text={isSubmitting ? "Отправка.." : "Подтвердить"}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
        {reqFailMessage !== undefined && <Text className={"text-info-red text-base"} text={reqFailMessage} />}
      </InnerPageWrapper>
    </FormProvider>
  );
};

export default MobileLegalEntityConfirmPage;
