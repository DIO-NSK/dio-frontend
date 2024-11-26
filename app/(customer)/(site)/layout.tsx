"use client";

import MobileNavbar from "@/components/mobile/moleculas/bars/navbar/MobileNavbar";
import { ActionBar } from "@/components/organisms/action-bar/ActionBar";
import { Footer } from "@/components/organisms/footer/Footer";
import { VStack } from "@chakra-ui/react";
import React from "react";
import { Container } from "./components/SiteContainer/Container";

const SiteLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <VStack w="full" alignItems="start" gap={["28px", "28px", 0]}>
      <MobileNavbar />
      <Container>{children}</Container>
      <ActionBar />
    </VStack>
    <Footer />
  </>
);

export default SiteLayout;
