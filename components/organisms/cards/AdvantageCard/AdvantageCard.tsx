import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import { Box } from "@chakra-ui/react";
import { iconWrapperStyles, textStyles, wrapperStyles } from "./AdavantageCard.styles";
import { AdvantageCardProps } from "./AdvantageCard.types";

export const AdvantageCard = ({ card: { icon, header }, classNames }: AdvantageCardProps) => (
  <Box className={cn(wrapperStyles(classNames?.wrapper))}>
    <Box className={cn(iconWrapperStyles)}>{icon}</Box>
    <Text className={cn(textStyles(classNames?.text))}>{header}</Text>
  </Box>
);
