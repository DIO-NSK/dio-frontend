import { $cart } from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { ProductsGroup } from "@/components/organisms/loading-blocks/cart/ProductsGroup/ProductsGroup";
import { SalesGroup } from "@/components/organisms/loading-blocks/cart/SalesGroup/SalesGroup";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { useUnit } from "effector-react";
import { Container, Divider } from "./CartContentBlock.styles";

const CartContentBlock = () => {
  const cart = useUnit($cart);
  const { products, promos } = cart || {};

  return (
    <Container className="md:col-span-8 xl:col-span-9">
      <IfRenderBlock condition={products?.length !== 0}>
        <ProductsGroup />
      </IfRenderBlock>
      <Divider className={"hidden xl:flex w-full h-[2px] bg-light-gray"} />
      <IfRenderBlock condition={promos?.length !== 0}>
        <SalesGroup />
      </IfRenderBlock>
    </Container>
  );
};

export default CartContentBlock;
