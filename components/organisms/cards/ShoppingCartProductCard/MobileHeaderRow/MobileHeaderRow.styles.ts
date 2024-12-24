import { chakra, HStack } from "@chakra-ui/react";

export const Row = chakra(HStack, {
  base: {
    alignItems: "center",
    gap: "28px",
  },
});
