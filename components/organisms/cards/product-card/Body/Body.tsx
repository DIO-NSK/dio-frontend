import Text from "@/components/atoms/Text/Text";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { cn } from "@/utlis/cn";
import { useDiscount } from "@/utlis/hooks/product/useDiscount";
import { MobilePrice } from "../MobilePrice/MobileAccess";
import { Row } from "../ProductCard.styles";
import { useProductCardContext } from "../ProductCardContext";
import { TabletPrice } from "../TabletPrice/TabletPrice";

export const Body = () => {
  const { productCard, classNames } = useProductCardContext();
  const { price: productPrice, discountPercent, name } = productCard;
  const [price, newPrice] = useDiscount(productPrice, discountPercent);

  return (
    <div className={cn("w-full flex flex-col gap-1", classNames?.textWrapper)}>
      <TabletPrice newPrice={newPrice} price={price} discountPercent={discountPercent} />
      <MobilePrice newPrice={newPrice} price={price} discountPercent={discountPercent} />
      <Row>
        <Text className="font-medium text-sm line-clamp-2 xl:text-base xl:min-h-[50px] max-h-fit">{name}</Text>
        <IfRenderBlock condition={(productCard as any)?.quantity}>
          <Text className="text-base text-text-gray">{(productCard as any)?.quantity} шт.</Text>
        </IfRenderBlock>
      </Row>
    </div>
  );
};
