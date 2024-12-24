import { chakra, VStack } from "@chakra-ui/react";

export const Column = chakra(VStack, {
  base: {
    alignItems: "start",
  },
});
