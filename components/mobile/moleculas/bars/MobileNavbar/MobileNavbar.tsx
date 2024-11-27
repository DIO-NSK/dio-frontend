"use client";

import { $userCredentials, getUserCredentialsEvent } from "@/app/(customer)/model";
import DIOLogoSmall from "@/components/atoms/svg/dio-logo-small/DIOLogoSmall";
import Text from "@/components/atoms/Text/Text";
import { MenuDrawer } from "@/components/organisms/MenuDrawer/MenuDrawer";
import { cn } from "@/utlis/cn";
import { Box } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { useToggle } from "usehooks-ts";
import { wrapperStyles } from "./MobileNavbar.styles";

const MobileNavbar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isDrawerOpen, toggleDrawer] = useToggle();

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
    <nav className={cn(wrapperStyles, className)}>
      <MenuDrawer>
        <Box w="18px" h="18px">
          <FiMenu />
        </Box>
      </MenuDrawer>
      <DIOLogoSmall onClick={handleLogoClick} />
      <Text
        className={cn(userCredentials ? "text-text-black" : "text-link-blue", "text-sm")}
        onClick={handleLogin}
        text={rightText}
      />
    </nav>
  );
};

export default MobileNavbar;
