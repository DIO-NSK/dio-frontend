import DIOLogo from "@/public/images/dio-logo.png";
import { Image } from "@chakra-ui/react";

export const SiteLogo = ({ context }: { context: any }) => (
  <Image
    className={"size-[50px] aspect-square pointer"}
    onClick={context.handleLogoClick}
    alt={"Логотип DIO"}
    src={DIOLogo.src}
  />
);
