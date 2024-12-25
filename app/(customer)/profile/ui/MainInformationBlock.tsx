import { $userCredentials, getUserCredentialsEvent } from "@/app/(customer)/model";
import Text from "@/components/atoms/Text/Text";
import BonusCard from "@/components/organisms/user-profile/bonus-card/BonusCard";
import UserInfoCard from "@/components/organisms/user-profile/user-info-card/UserInfoCard";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { useUnit } from "effector-react";
import { useEffect } from "react";

export const MainInformationBlock = () => {
  const [userCredentials, getUserCredentials] = useUnit([$userCredentials, getUserCredentialsEvent]);

  useEffect(() => {
    if (!userCredentials) getUserCredentials();
  }, []);

  return (
    <IfRenderBlock condition={Boolean(userCredentials)}>
      <div className="w-full flex flex-col gap-1">
        <Text className="text-lg font-medium hidden md:flex" text="Основная информация" />
        <div className="w-full flex md:items-start flex-col-reverse xl:flex-row gap-5">
          <UserInfoCard userCredentials={userCredentials!} />
          <BonusCard />
        </div>
      </div>
    </IfRenderBlock>
  );
};
