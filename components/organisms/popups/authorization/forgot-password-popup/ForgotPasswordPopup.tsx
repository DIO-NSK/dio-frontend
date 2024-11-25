"use client";

import Button from "@/components/atoms/buttons/button/Button";
import ControlledCaptcha from "@/components/atoms/inputs/controlled-captcha/ControlledCaptcha";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/Text/Text";
import {
  sendConfirmationCodePasswordFx,
  setPasswordPhoneNumberEvent,
} from "@/components/organisms/popups/authorization/forgot-password-popup/model";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import { LoginByPhoneData, LoginByPhoneSchema } from "@/schemas/customer/authorization/LoginByPhoneSchema";
import { useStore } from "@/store/Store";
import { PopupProps } from "@/types/props/Popup";
import { useSmartCaptcha } from "@/utlis/hooks/useSmartCaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useEffect, useState } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";

const message = "Введите номер телефона, привязанный к вашему аккаунту. Вам придет SMS с кодом для подтверждения";

const ForgotPasswordPopup = (props: PopupProps) => {
  const methods = useForm<LoginByPhoneData>({
    resolver: zodResolver(LoginByPhoneSchema),
    mode: "onSubmit",
  });

  const setPasswordPhoneNumber = useUnit(setPasswordPhoneNumberEvent);
  const switchPopupState = useStore((state) => state.switchPopupState);
  const sendConfirmationCode = useUnit(sendConfirmationCodePasswordFx);

  const {
    formState: { isSubmitting },
    trigger,
    getValues,
  } = methods;
  const [captchaVisible, toggleCaptchaVisible, handleValidateForm, key, resetKey] = useSmartCaptcha<LoginByPhoneData>(
    ["phoneNumber"],
    trigger,
  );

  const [error, setError] = useState<string>("");

  const onSubmit = () => {
    const { phoneNumber, captchaToken }: LoginByPhoneData = getValues();
    const convertedPhoneNumber = phoneNumber.replace(/[\s()-]/g, "");

    sendConfirmationCode({ phoneNumber: convertedPhoneNumber, captchaToken })
      .then((_) => {
        setPasswordPhoneNumber(convertedPhoneNumber);
        switchPopupState("changePassword");
      })
      .catch((message) => setError(message));
  };

  useEffect(() => {
    setPasswordPhoneNumber(null);
  }, []);

  return (
    <FormProvider {...methods}>
      <PopupWrapper onClose={props.onClose}>
        <Form className={"w-[450px] rounded-xl bg-white flex flex-col gap-5"}>
          <Text text={"Забыли пароль?"} className={"text-[20px] font-medium"} />
          <Text className={"text-text-gray"} text={message} />
          <ControlledTextInput
            labelText={"Номер телефона"}
            placeholder={"+_ (___) ___-__-__"}
            inputMask={"+7 (999) 999-99-99"}
            name={"phoneNumber"}
          />
          {error.length !== 0 && <Text className={"text-red-500"} text={error} />}
          <Button
            disabled={isSubmitting}
            text={isSubmitting ? "Отправка.." : "Отправить код"}
            onClick={async () => {
              resetKey();
              await handleValidateForm();
            }}
          />
          <ControlledCaptcha
            key={key}
            visible={captchaVisible}
            onChallengeHidden={toggleCaptchaVisible}
            onSuccess={onSubmit}
          />
        </Form>
      </PopupWrapper>
    </FormProvider>
  );
};

export default ForgotPasswordPopup;
