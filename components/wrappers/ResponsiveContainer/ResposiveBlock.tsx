import { PropsWithClassName } from "@/types/props/utils/PropsWithClassName";
import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export const ResponsiveBlock = ({ children, className }: PropsWithClassName<PropsWithChildren>) => (
  <Box w="full" maxWidth={["100%", "100%", "724px", "964px", "1260px", "1560px"]} className={className}>
    {children}
  </Box>
);
