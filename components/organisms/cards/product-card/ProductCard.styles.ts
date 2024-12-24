import Text from "@/components/atoms/Text/Text";
import { chakra, Flex, VStack } from "@chakra-ui/react";
import { ClassValue } from "clsx";

export const wrapperStyles = (className?: string): ClassValue[] => [
  "w-full sm:col-span-3 h-fit flex flex-col gap-[15px] md:gap-4 p-[15px] md:p-5 bg-white",
  "xl:gap-7 xl:p-7 rounded-xl xl:hover:z-10 xl:hover:shadow-lg xl:hover:shadow-gray-200/50 xl:hover:scale-[1.01] xl:hoverable pointer",
  "border-2 border-light-gray relative",
  className,
];

export const InnerContainer = chakra(Flex, {
  base: {
    flexDirection: "column",
    w: "full",
  },
});

export const Row = chakra(VStack, {
  base: {
    alignItems: "start",
    gap: "8px",
    w: "full",
  },
});

export const Container = chakra.article