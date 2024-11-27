import { VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const BottomRelatedProductsLayout = ({ children }: PropsWithChildren) => (
  <VStack w="full" gridColumn="1 / -1" alignItems="start" gap="40px">
    {children}
  </VStack>
);

export default BottomRelatedProductsLayout;
