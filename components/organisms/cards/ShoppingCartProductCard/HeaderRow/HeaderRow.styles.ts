import { chakra, HStack } from "@chakra-ui/react";

export const headerRowCN = [
  "xl:flex-row xl:justify-between xl:items-center",
  "md:flex-col md:gap-3 md:items-start",
  "w-full flex",
];

export const Row = chakra(HStack, {
    base : {
        gap : "28px"
    }
})