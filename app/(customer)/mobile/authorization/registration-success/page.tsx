"use client";

import Button from "@/components/atoms/buttons/button/Button";
import DIOLogoSmall from "@/components/atoms/svg/dio-logo-small/DIOLogoSmall";
import Text from "@/components/atoms/Text/Text";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import { useNavigation } from "@/utlis/hooks/useNavigation";

const MobileRegistrationSuccessPage = () => {
  const navigation = useNavigation();

  return (
    <InnerPageWrapper classNames={{ mobileWrapper: "pt-[100px] h-screen items-center gap-7" }}>
      <div className={"w-[150px] h-[150px] rounded-full bg-link-blue flex items-center justify-center"}>
        <DIOLogoSmall size={120} />
      </div>
      <Text text={"Вы успешно зарегистрировались!"} className={"text-2xl text-center font-semibold"} />
      <Button classNames={{ button: "w-full" }} onClick={() => navigation.push("/")} text={"Перейти к покупкам"} />
    </InnerPageWrapper>
  );
};

export default MobileRegistrationSuccessPage;
