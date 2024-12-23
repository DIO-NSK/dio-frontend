import { chakra, VStack } from "@chakra-ui/react";

export const Column = chakra(VStack, {
  base: {
    gridColumn: ["1 / -1", "1 / -1", "1 / -1", "span 8 / span 8", "span 9 / span 9"],
    gap: { base: "20px", xl: "40px" },
    alignItems: "start",
    w: "full",
  },
});
