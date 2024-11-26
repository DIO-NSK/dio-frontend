import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SliderGroup from "@/components/wrappers/SliderGroup/SliderGroup";
import { productCardCV } from "../page.data";
import { getNewProducts } from "../page.hooks";

export const NewProducts = async () => {
  const newProducts = await getNewProducts();

  return newProducts.length > 0 ? (
    <SliderGroup header="Новинки" className="-mt-8 md:mt-0">
      {newProducts.map((productCard, key) => (
        <ProductCard classNames={productCardCV} productCard={productCard} key={key} />
      ))}
    </SliderGroup>
  ) : null;
};
