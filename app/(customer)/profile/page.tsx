"use client";

import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import UserProfileWrapper from "@/components/wrappers/user-profile-wrapper/UserProfileWrapper";
import { useNavigation } from "@/utlis/hooks/useNavigation";
import { FiX } from "react-icons/fi";
import { LastOrderBlock } from "./ui/LastOrderBlock";
import { MainInformationBlock } from "./ui/MainInformationBlock";

const UserProfilePage = () => {
  const navigation = useNavigation();

  const handleBack = () => navigation.push("/");

  return (
    <UserProfileWrapper>
      <HeaderRow
        rightContent={<FiX size="20px" className="lg:hidden flex" onClick={handleBack} />}
        className="w-full mt-5 md:mt-0"
        header="Мой профиль"
      />
      <MainInformationBlock />
      <LastOrderBlock />
    </UserProfileWrapper>
  );
};

export default UserProfilePage;
