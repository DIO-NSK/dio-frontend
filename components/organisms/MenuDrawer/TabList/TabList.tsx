import Text from "@/components/atoms/Text/Text";
import { HStack, VStack } from "@chakra-ui/react";
import { TabListProps } from "./TabList.types";

export const TabList = ({ tabs }: TabListProps) => (
  <VStack w="full" gap="28px" pb="28px" className="items-start border-b-2 border-light-gray">
    {tabs.map(({ action, icon, text }, index) => (
      <HStack gap="1rem" onClick={action} key={index}>
        {icon}
        <Text>{text}</Text>
      </HStack>
    ))}
  </VStack>
);
