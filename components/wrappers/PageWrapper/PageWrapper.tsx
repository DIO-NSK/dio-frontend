import { Flex } from "@chakra-ui/react";
import { PageWrapperProps } from "./PageWrapper.types";

export const PageWrapper = ({ children, className }: PageWrapperProps) => (
  <Flex
    gap={["28px", "28px", "28px", "48px"]}
    marginTop={[0, 0, 0, "4px", "1rem"]}
    paddingTop={[0, 0, "24px"]}
    flexDirection="column"
    className={className}
    alignItems="center"
    display="flex"
    w="100%"
  >
    {children}
  </Flex>
);
