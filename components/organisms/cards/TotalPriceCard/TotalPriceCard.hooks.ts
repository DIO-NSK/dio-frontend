import { useDiscount } from "@/utlis/hooks/product/useDiscount";
import { TotalPriceCardProps } from "./TotalPriceCard.types";
import { validateCart } from "./TotalPriceCard.utils";

type UseTotalPriceCardParams = Pick<TotalPriceCardProps, "products" | "promos">;

export const useTotalPriceCard = ({ products, promos }: UseTotalPriceCardParams) => {
  const hasProductNotInStock = products.some((product) => !product.inStock);
  const hasSaleNotInStock = promos.some((promo) => !promo.products.some((product) => !product.inStock));
  const hasItemInStock = hasSaleNotInStock || hasProductNotInStock;

  const totalProductsActualPrice = products.reduce((acc, item) => {
    const [_, newPrice] = useDiscount(item.price, item.discountPercent);
    return "quantity" in item ? acc + newPrice * item.quantity : acc + newPrice;
  }, 0);

  const totalPromosPrice = promos.reduce((acc, promo) => {
    return "quantity" in promo ? acc + promo.price * promo.quantity : acc + (promo as any).price;
  }, 0);

  const totalProductsOldPrice = products.reduce((acc, item) => {
    const [oldPrice, _] = useDiscount(item.price, item.discountPercent);
    return "quantity" in item ? acc + oldPrice * item.quantity : acc + oldPrice;
  }, 0.0);

  const totalProductsAmount = products.reduce((acc, item) => {
    return "quantity" in item ? acc + item.quantity : acc + 1;
  }, 0);

  const totalPromosAmount = promos.reduce((acc, promo) => {
    return "quantity" in promo ? acc + promo.quantity : acc + 1;
  }, 0);

  const totalActualPrice = totalProductsActualPrice + totalPromosPrice;
  const totalDiscount = totalProductsOldPrice - totalProductsActualPrice;
  const totalItemsAmount = totalProductsAmount + totalPromosAmount;

  const isValidCart = validateCart(totalActualPrice, products);

  const cardRows = [
    { header: "Количество", data: totalItemsAmount + " шт." },
    { header: "Скидка", data: totalDiscount.toFixed(2) + " ₽" },
  ];

  return {
    totalActualPrice,
    hasItemInStock,
    isValidCart,
    cardRows,
  };
};
