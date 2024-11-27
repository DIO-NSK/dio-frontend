import { PropsWithClassName } from "@/types/props/utils/PropsWithClassName";
import { VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { ResponsiveBlock } from "./ResposiveBlock";

export const ResponsiveContainer = ({ children, className }: PropsWithClassName<PropsWithChildren>) => (
  <VStack w="full" position="relative" className={className}>
    <ResponsiveBlock>{children}</ResponsiveBlock>
  </VStack>
);
