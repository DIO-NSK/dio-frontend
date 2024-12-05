"use client";

import { ChakraProvider, Theme } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { system } from "./theme";

export const Provider = ({ children, ...props }: ColorModeProviderProps) => (
  <ChakraProvider value={system}>
    <ColorModeProvider forcedTheme="light" {...props}>
      <Theme appearance="light">{children}</Theme>
    </ColorModeProvider>
  </ChakraProvider>
);
