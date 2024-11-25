import Text from "@/components/atoms/Text/Text";
import Button from "@/components/atoms/buttons/button/Button";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import { useState } from "react";
import { FiX } from "react-icons/fi";

const message = `Вам на телефон придет СМС-уведомление.
     Введите код для сброса пароля`;

const MobileForgotPasswordPopup = ({ onClose }: { onClose: () => void }) => {
  const [code, setCode] = useState<string>("");
  const handleChangePassword = () => console.log("Password changed");
  const handleSendCode = () => console.log("Code was sent!");

  return (
    <InnerPageWrapper classNames={{ mobileWrapper: "fixed z-40 left-0 top-0 gap-5" }}>
      <HeaderRow rightContent={<FiX onClick={onClose} />} theme={"bordered"} header={"Забыли пароль?"} />
      <Text text={message} className={"text-text-gray"} />
      <TextInput
        labelText={"Код подтверждения"}
        placeholder={"Введите код подтверждения"}
        value={code}
        onChange={setCode}
      />
      <section className={"w-full flex flex-col gap-3"}>
        <Button text={"Подтвердить"} onClick={handleChangePassword} />
        <Button text={"Отправить код заново — 0:43"} onClick={handleSendCode} buttonType={"SECONDARY"} />
      </section>
    </InnerPageWrapper>
  );
};

export default MobileForgotPasswordPopup;
