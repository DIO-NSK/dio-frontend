"use client";

import Button from "@/components/atoms/buttons/button/Button";
import Text from "@/components/atoms/Text/Text";
import { HStack, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export const Content = () => {
  const router = useRouter();
  const handleBack = () => router.back();
  const handleGoToMain = () => router.push("/");

  return (
    <VStack alignItems="start" gap="28px">
      <VStack alignItems="start" gap="1rem">
        <Text className="text-[64px] md:text-[80px] xl:text-[96px] leading-none font-bold text-link-blue">404</Text>
        <VStack alignItems="start" gap="1rem">
          <Text className="text-lg sm:text-2xl font-medium">Такой страницы не существует</Text>
          <Text className="text-base text-center sm:text-start sm:text-xl text-text-gray sm:w-[400px] text-pretty">
            Проверьте корректность вашей ссылки, <br /> либо вы можете вернуться на главную
          </Text>
        </VStack>
      </VStack>
      <HStack gap="1rem">
        <Button text="На главную" onClick={handleGoToMain} />
        <Button text="Назад" onClick={handleBack} buttonType="SECONDARY" />
      </HStack>
    </VStack>
  );
};
