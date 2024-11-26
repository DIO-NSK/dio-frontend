import { chakra, Flex } from "@chakra-ui/react";

export const Container = chakra(Flex, {
  base: {
    justifyContent: "space-between",
    top: "calc(50%-32px)",
    position: "absolute",
    padding: "20px",
    width: "full",
    zIndex: "10",
    left: "0px",
  },
});
