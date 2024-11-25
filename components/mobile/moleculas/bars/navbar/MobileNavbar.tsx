"use client";

import { $userCredentials, getUserCredentialsEvent } from "@/app/(customer)/model";
import DIOLogoSmall from "@/components/atoms/svg/dio-logo-small/DIOLogoSmall";
import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import { Box } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const wrapperStyles = "lg:hidden w-full flex flex-row items-center px-5 md:px-6 bg-white justify-between py-5";

const MobileNavbar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [userCredentials, getUserCredentials] = useUnit([$userCredentials, getUserCredentialsEvent]);
  const rightText = userCredentials?.fullName.split(" ")[1] ?? "Войти";
  const isMenuPage = pathname.includes("/mobile/menu");

  const handleLogin = () => {
    if (!userCredentials) {
      router.push("/mobile/authorization");
    }
  };

  const handleLogoClick = () => router.push("/");

  const handleMenuClick = () => {
    if (pathname.includes("/mobile/menu")) router.back();
    else router.push("/mobile/menu");
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  return (
    <>
      <nav className={cn(wrapperStyles, className)}>
        <Box onClick={handleMenuClick}>{isMenuPage ? <FiX size="18px" /> : <FiMenu size="18px" />}</Box>
        <DIOLogoSmall onClick={handleLogoClick} />
        <Text
          className={cn(userCredentials ? "text-text-black" : "text-link-blue", "text-sm")}
          onClick={handleLogin}
          text={rightText}
        />
      </nav>
    </>
  );
};

export default MobileNavbar;
