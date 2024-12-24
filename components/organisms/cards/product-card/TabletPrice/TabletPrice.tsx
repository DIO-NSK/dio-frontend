import Text from "@/components/atoms/Text/Text";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { chakra } from "@chakra-ui/react";
import { TabletPriceProps } from "../ProductCard.types";

const Container = chakra.span;

export const TabletPrice = ({ newPrice, price, discountPercent }: TabletPriceProps) => (
  <Container className="w-full hidden md:flex flex-row items-baseline gap-3">
    <Text className="xl:text-[22px] lg:text-[20px] font-semibold text-link-blue">{newPrice.toFixed(2) + " ₽"}</Text>
    <IfRenderBlock condition={discountPercent !== 0}>
      <Text className={"xl:text-base lg:text-sm text-text-gray line-through"} text={price.toFixed(2) + " ₽"} />
    </IfRenderBlock>
  </Container>
);
