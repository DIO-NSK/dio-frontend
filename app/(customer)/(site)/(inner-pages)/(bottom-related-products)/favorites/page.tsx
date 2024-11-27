"use client";

import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import { TotalPriceCard } from "@/components/organisms/cards/TotalPriceCard/TotalPriceCard";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import { CartLoading } from "../cart/components/CartLoading";
import { Empty } from "./components/Empty";
import { ProductsBlock } from "./components/ProductsBlock/ProductsBlock";
import { useFavoritesPage } from "./page.hooks";

const FavoritesPage = () => {
  const { favourites, handleButtonClick, infoBlockData } = useFavoritesPage();

  if (!favourites) {
    return <CartLoading />;
  }

  const { products, promos } = favourites;

  return (
    <InnerPageWrapper classNames={{ mobileWrapper: "pt-0" }}>
      {products.length !== 0 ? <ProductsBlock products={products} /> : <Empty />}
      <TotalPriceCard
        buttonText="Добавить все в корзину"
        onClick={handleButtonClick}
        promos={promos as any}
        products={products}
      />
      {products?.length !== 0 ? (
        <MobileCartInfoBlock
          buttonText="Добавить все в корзину"
          infoBlockData={infoBlockData}
          onSubmit={handleButtonClick}
        />
      ) : null}
    </InnerPageWrapper>
  );
};

export default FavoritesPage;
