import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SliderGroup from "@/components/wrappers/SliderGroup/SliderGroup";
import { productCardCV } from "../page.data";
import { getSaleProducts } from "../page.hooks";

export const SaleProdcuts = async () => {
  const saleProducts = await getSaleProducts();

  return (
    <SliderGroup
      className="-mt-6 md:-mt-0 bg-bg-light-blue py-5 md:py-0 md:bg-white"
      header="Товары по акции"
      id="sale"
    >
      {saleProducts
        .filter((prod) => prod.discountPercent !== 0)
        .slice(0, 5)
        .map((productCard, key) => (
          <ProductCard classNames={productCardCV} productCard={productCard} key={key} />
        ))}
    </SliderGroup>
  );
};
