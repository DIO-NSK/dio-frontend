import Button from "@/components/atoms/buttons/button/Button";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import Form from "@/components/atoms/form/Form";
import ControlledCaptcha from "@/components/atoms/inputs/controlled-captcha/ControlledCaptcha";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import Text from "@/components/atoms/Text/Text";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import { FormProvider } from "react-hook-form";
import { inputData } from "./SignUpPopup.data";
import { useSignUpPopup } from "./SignUpPopup.hooks";

const SignUpPopup = () => {
  const {
    states: { isSubmitting, key, captchaVisible, error, authContext, methods },
    actions: { handleClick, handleRegisterLegalEntity, onSubmit, toggleCaptchaVisible },
  } = useSignUpPopup();

  const buttonText = isSubmitting ? "Отправка.." : "Подтвердить номер телефона";

  return (
    <FormProvider {...methods}>
      <PopupWrapper>
        <Form className="w-[450px] rounded-xl bg-white flex flex-col gap-5">
          <MultiselectButton
            activeElement={authContext.multiselectElements[1]}
            selectElement={authContext.handleSelectElement}
            elements={authContext.multiselectElements}
          />
          {inputData.map((input, key) => (
            <ControlledTextInput disabled={isSubmitting} key={key} {...input} />
          ))}
          <div className="w-full flex flex-col items-center gap-5">
            {error.length !== 0 ? <Text className="text-sm text-red-500">{error}</Text> : null}
            <Button classNames={{ button: "w-full" }} disabled={isSubmitting} onClick={handleClick} text={buttonText} />
            <TextButton onClick={handleRegisterLegalEntity} text="Регистрация юридического лица" />
          </div>
          <ControlledCaptcha
            onChallengeHidden={toggleCaptchaVisible}
            visible={captchaVisible}
            onSuccess={onSubmit}
            key={key}
          />
        </Form>
      </PopupWrapper>
    </FormProvider>
  );
};

export default SignUpPopup;
