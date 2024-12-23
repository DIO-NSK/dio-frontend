"use client";

import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import { TotalPriceCard } from "@/components/organisms/cards/TotalPriceCard/TotalPriceCard";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
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
  const isNotEmpty = products?.length !== 0;

  return (
    <InnerPageWrapper classNames={{ mobileWrapper: "pt-0" }}>
      {isNotEmpty ? <ProductsBlock products={products} /> : <Empty />}
      <TotalPriceCard
        buttonText="Добавить все в корзину"
        onClick={handleButtonClick}
        shouldRestrict={false}
        promos={promos as any}
        products={products}
      />
      <IfRenderBlock condition={isNotEmpty}>
        <MobileCartInfoBlock
          buttonText="Добавить все в корзину"
          infoBlockData={infoBlockData}
          onSubmit={handleButtonClick}
        />
      </IfRenderBlock>
    </InnerPageWrapper>
  );
};

export default FavoritesPage;
