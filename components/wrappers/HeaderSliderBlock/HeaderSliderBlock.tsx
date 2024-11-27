"use client";

import Text from "@/components/atoms/Text/Text";
import ButtonSlider from "@/components/moleculas/sliders/ButtonSlider/ButtonSlider";
import { HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { SliderWrapper } from "./SliderWrapper";

const HeaderSliderBlock = ({ header, children }: { header: string; children: React.ReactNode }) => (
  <VStack w="full" px="20px" py="28px" gap="10px" className="bg-bg-light-blue border-b-2 border-light-gra">
    <HStack justifyContent="space-between" gridColumn="1 / -1" w="full">
      <Text className={"text-[20px] sm:text-[24px] font-semibold leading-none"}>{header}</Text>
      <ButtonSlider />
    </HStack>
    <SliderWrapper>{children}</SliderWrapper>
  </VStack>
);

export default HeaderSliderBlock;
