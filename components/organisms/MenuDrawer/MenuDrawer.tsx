import { $userCredentials } from "@/app/(customer)/model";
import Button from "@/components/atoms/buttons/button/Button";
import MobileFooterNavbar from "@/components/mobile/organisms/mobile-footer-navbar/MobileFooterNavbar";
import { DrawerBackdrop, DrawerCloseTrigger, DrawerContent, DrawerRoot, DrawerTrigger } from "@/components/ui/drawer";
import { useUnit } from "effector-react";
import { HotlineBlock } from "./HotlineBlock/HotlineBlock";
import { LogInHeader } from "./LogInHeader/LogInHeader";
import { useMenuDrawer } from "./MenuDrawer.hooks";
import { DrawerProps } from "./MenuDrawer.types";
import { SocialMediaBlock } from "./SocialMediaBlock/SocialMediaBlock";
import { TabList } from "./TabList/TabList";

export const MenuDrawer = ({ isOpen, onClose, children }: Partial<DrawerProps>) => {
  const {
    actions: { handleManageRole, handleOrderCallRequest },
    states: { menuTabs, authorizedTabs },
  } = useMenuDrawer();

  const userCredentials = useUnit($userCredentials);

  return (
    <DrawerRoot open={isOpen} onOpenChange={onClose} placement="start" size="full">
      <DrawerBackdrop />
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent px="20px" py="28px" display="flex" flexDirection="column" gap="28px" overflowY="scroll">
        <LogInHeader onManageRole={handleManageRole} />
        {userCredentials ? <TabList tabs={authorizedTabs} /> : null}
        <TabList tabs={menuTabs.slice(1)} />
        <Button onClick={handleOrderCallRequest} buttonType="SECONDARY">
          Заказать звонок
        </Button>
        <MobileFooterNavbar />
        <HotlineBlock />
        <SocialMediaBlock />
        <DrawerCloseTrigger position="absolute" right="20px" top="20px" />
      </DrawerContent>
    </DrawerRoot>
  );
};
