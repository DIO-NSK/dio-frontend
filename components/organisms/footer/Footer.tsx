import { ResponsiveContainer } from "@/components/wrappers";
import { Box } from "@chakra-ui/react";
import React from "react";
import { ResponsiveFooter } from "./ResponsiveFooter";

export const Footer = React.forwardRef<HTMLDivElement>((_, ref) => (
  <ResponsiveContainer className="bg-bg-light-blue" ref={ref}>
    <Box py={["28px", "28px", "28px", "32px", "50px"]} px={["5px", "5px", "5px", 0]} w="full">
      <ResponsiveFooter />
    </Box>
  </ResponsiveContainer>
));
