import TextNavbar from "@/components/moleculas/text-navbar/TextNavbar";
import { ResponsiveContainer } from "@/components/wrappers";
import { cn } from "@/utlis/cn";
import { Box, HStack } from "@chakra-ui/react";
import { LinkRow } from "./LinkRow";
import { wrapperCN } from "./Navbar.styles";
import { PhoneLink } from "./PhoneLink";

const Navbar = () => (
  <ResponsiveContainer className="bg-bg-light-blue">
    <Box className={cn(wrapperCN)}>
      <TextNavbar />
      <HStack gap="2rem">
        <PhoneLink />
        <LinkRow />
      </HStack>
    </Box>
  </ResponsiveContainer>
);

export default Navbar;
