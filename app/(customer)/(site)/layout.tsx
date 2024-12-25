"use client";

import MobileNavbar from "@/components/mobile/moleculas/bars/MobileNavbar/MobileNavbar";
import { ActionBar } from "@/components/organisms/action-bar/ActionBar";
import { Footer } from "@/components/organisms/footer/Footer";
import { VStack } from "@chakra-ui/react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Container } from "./components/SiteContainer/Container";

const SEARCHBAR_HEIGHT = 164;

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number>(0);

  const updateMinHeight = () => {
    const { height: footerHeight } = footerRef.current!.getBoundingClientRect();
    const height = window.innerHeight - footerHeight - SEARCHBAR_HEIGHT;

    setMinHeight(height);
  };

  useEffect(() => {
    if (footerRef.current) {
      window.addEventListener("resize", updateMinHeight);

      return () => window.removeEventListener("resize", updateMinHeight);
    }
  }, [footerRef]);

  useLayoutEffect(() => {
    if (footerRef.current) {
      updateMinHeight();
    }
  }, [footerRef]);

  return (
    <>
      <VStack w="full" alignItems="start" gap={["28px", "28px", 0]} minH={minHeight}>
        <MobileNavbar />
        <Container>{children}</Container>
        <ActionBar />
      </VStack>
      <Footer ref={footerRef} />
    </>
  );
};

export default SiteLayout;
