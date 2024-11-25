import { ResponsiveContainer } from "@/components/wrappers";
import { Box } from "@chakra-ui/react";
import { ResponsiveFooter } from "./ResponsiveFooter";

export const Footer = () => (
  <ResponsiveContainer className="bg-bg-light-blue">
    <Box py={["28px", "28px", "28px", "32px", "50px"]} px={["5px", "5px", "5px", 0]} w="full">
      <ResponsiveFooter />
    </Box>
  </ResponsiveContainer>
);
