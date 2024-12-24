import { removeProductFromCartEvent } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import Chip from "@/components/atoms/chip/Chip";
import Text from "@/components/atoms/Text/Text";
import Counter from "@/components/moleculas/Counter/Counter";
import { ShoppingCartProductCardProps } from "@/components/organisms/cards/ShoppingCartProductCard/ShoppingCartProductCard.types";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { useCounter } from "@/utlis/hooks/product/useCounter";
import { useDiscount } from "@/utlis/hooks/product/useDiscount";
import { useUnit } from "effector-react";
import { FiTrash2 } from "react-icons/fi";
import { MobilePrice } from "../Price/MobilePrice";
import { Row } from "./MobileHeaderRow.styles";

export const MobileHeaderRow = ({ canInteract = true, card }: ShoppingCartProductCardProps) => {
  const { productId, quantity, discountPercent, inStock, price: productPrice, name } = card;

  const [amount, increase, decrease] = useCounter(productId, quantity);
  const [price, newPrice] = useDiscount(productPrice, discountPercent);
  const removeProductFromCart = useUnit(removeProductFromCartEvent);

  const handleDeleteProduct = () => removeProductFromCart({ productId: productId });

  return (
    <section className="md:hidden flex flex-col gap-2">
      <IfRenderBlock condition={!inStock}>
        <Chip className="bg-gray-100">
          <Text className="text-xs uppercase text-text-gray">Нет в наличии</Text>
        </Chip>
      </IfRenderBlock>
      <Text>{name}</Text>
      <MobilePrice discountPercent={discountPercent} newPrice={newPrice} amount={quantity} price={price} />
      {canInteract ? (
        <Row>
          <Counter amount={amount} increase={increase} decrease={decrease} />
          <FiTrash2 size="18px" className="text-info-red" onClick={handleDeleteProduct} />
        </Row>
      ) : (
        <Text className="text-base sm:text-lg text-text-gray">{quantity + " шт."}</Text>
      )}
    </section>
  );
};
