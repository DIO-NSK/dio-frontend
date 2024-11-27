import Text from "@/components/atoms/Text/Text";
import { VStack } from "@chakra-ui/react";
import Link from "next/link";

export const HotlineBlock = () => (
  <VStack gap="8px" alignItems="start" w="full">
    <Text className="text-text-gray">Горячая линия</Text>
    <Link href="tel:+733339900">
      <Text>+7 (383) 333-99-00</Text>
    </Link>
  </VStack>
);
