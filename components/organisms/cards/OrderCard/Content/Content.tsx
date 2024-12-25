import ShoppingCartProductCard from "../../ShoppingCartProductCard/ShoppingCartProductCard";
import { OrderCardBlockProps } from "../OrderCard.types";

export const Content = ({ order: { items } }: OrderCardBlockProps) => (
  <div className="w-full flex flex-col gap-5 py-5 md:gap-10">
    {items.map((product, productKey) => (
      <ShoppingCartProductCard card={product as any} canInteract={false} isOrder key={productKey} />
    ))}
  </div>
);
