"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { system } from "./theme";

export const Provider = (props: ColorModeProviderProps) => (
  <ChakraProvider value={system}>
    <ColorModeProvider {...props} />
  </ChakraProvider>
);
