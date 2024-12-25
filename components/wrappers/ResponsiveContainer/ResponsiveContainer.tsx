import { PropsWithClassName } from "@/types/props/utils/PropsWithClassName";
import { VStack } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { ResponsiveBlock } from "./ResposiveBlock";

export const ResponsiveContainer = React.forwardRef<HTMLDivElement, PropsWithClassName<PropsWithChildren>>(
  ({ children, className }: PropsWithClassName<PropsWithChildren>, ref) => (
    <VStack w="full" position="relative" className={className} ref={ref}>
      <ResponsiveBlock>{children}</ResponsiveBlock>
    </VStack>
  ),
);
