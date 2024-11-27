import Text from "@/components/atoms/Text/Text";
import { HStack } from "@chakra-ui/react";

export const Header = ({ selectedCards }: { selectedCards: any[] }) => (
  <HStack gridColumn={{ md: "1 / -1" }} w="full" justifyContent="space-between" gap="12px">
    <div className={"flex flex-row items-baseline gap-2"}>
      <Text className="text-[20px] sm:text-[24px] font-medium">Избранное</Text>
      <Text className="text-[14px] sm:ext-base text-text-gray">{`Всего ${selectedCards.length}`}</Text>
    </div>
  </HStack>
);
