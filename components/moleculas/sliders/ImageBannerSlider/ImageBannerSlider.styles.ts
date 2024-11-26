import { chakra, Flex } from "@chakra-ui/react";

export const Container = chakra(Flex, {
  base: {
    height: ["fit-content", "fit-content", "310px", "330px", "390px"],
    position: "relative",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "16px",
    overflow: "clip",
  },
});
