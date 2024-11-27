import Text from "@/components/atoms/Text/Text";
import { HStack, VStack } from "@chakra-ui/react";
import { PriceListProps } from "./PriceList.types";

export const PriceList = ({ items }: PriceListProps) => (
  <VStack gap="12px" pb="12px" className="border-b-2 border-light-gray">
    {items.map(({ header, data }) => (
      <HStack alignItems="baseline" justifyContent="space-between" w="full">
        <Text className="text-base text-text-gray">{header}</Text>
        <Text className="text-base text-text-gray">{data}</Text>
      </HStack>
    ))}
  </VStack>
);
