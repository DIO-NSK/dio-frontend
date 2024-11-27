import Text from "@/components/atoms/Text/Text";
import { Image, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { socialMedia } from "../MenuDrawer.constants";

export const SocialMediaBlock = () => (
  <VStack gap="12px" alignItems="start">
    <Text className="text-text-gray">Связаться с нами</Text>
    <VStack gap="20px">
      {socialMedia.map(({ icon, text, href }, index) => (
        <Link className="w-full flex flex-row items-center gap-4" href={href} key={index}>
          <Image src={icon} w="20px" h="20px" alt="/" />
          <Text text={text} />
        </Link>
      ))}
    </VStack>
  </VStack>
);
