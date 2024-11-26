import { VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const MobileContainer = ({ children }: PropsWithChildren) => (
  <VStack w="full" gap="28px" lg={{ display: "hidden" }}>
    {children}
  </VStack>
);
