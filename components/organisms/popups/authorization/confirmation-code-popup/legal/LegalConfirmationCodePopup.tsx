import {
  $firstStepData,
  sendLegalConfirmationCodeFx,
} from "@/app/(customer)/(site)/(inner-pages)/register/legal-entity/model";
import Button from "@/components/atoms/buttons/button/Button";
import Form from "@/components/atoms/form/Form";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/Text/Text";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import { UserConfirmCodeData, UserConfirmCodeSchema } from "@/schemas/customer/authorization/UserConfirmCodeSchema";
import { PopupProps } from "@/types/props/Popup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const LegalConfirmationCodePopup = (props: PopupProps) => {
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
      .then(props.onClose)
      .catch((error) => setReqFailMessage(error.message));
  };

  return (
    <FormProvider {...methods}>
      <PopupWrapper {...props}>
        <Form className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
          <Text text={"Подтверждение номера телефона"} className={"text-[20px] font-medium"} />
          <Text
            text={"Вам на телефон придёт СМС-уведомление. Введите код для сброса пароля"}
            className={"text-text-gray text-balance"}
          />
          <ControlledTextInput
            disabled={isSubmitting}
            labelText={"Код подтверждения"}
            placeholder={"0000"}
            inputMask={"9999"}
            name={"code"}
          />
          <Button
            text={isSubmitting ? "Отправка.." : "Подтвердить"}
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          />
          {reqFailMessage !== undefined && <Text className={"text-info-red text-base"} text={reqFailMessage} />}
        </Form>
      </PopupWrapper>
    </FormProvider>
  );
};

export default LegalConfirmationCodePopup;
