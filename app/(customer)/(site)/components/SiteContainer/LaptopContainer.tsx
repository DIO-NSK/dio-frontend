import { VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const LaptopContainer = ({ children }: PropsWithChildren) => (
  <VStack w="full" minHeight="screen" display={["none", "none", "none", "flex"]}>
    {children}
  </VStack>
);
