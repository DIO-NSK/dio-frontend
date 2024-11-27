"use client";

import Loading from "@/components/mobile/loading/Loading";
import MobileCartInfoBlock from "@/components/mobile/organisms/mobile-cart-info-block/MobileCartInfoBlock";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import { TotalPriceCard } from "@/components/organisms/cards/TotalPriceCard/TotalPriceCard";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import dynamic from "next/dynamic";
import { Empty } from "../favorites/components/Empty";
import { CartLoading } from "./components/CartLoading";
import { useCartPage } from "./page.hooks";

const CartContentBlock = dynamic(() => import("@/components/organisms/loading-blocks/cart/CartContentBlock"), {
  loading: () => <Loading className={"col-span-9"} />,
});

const ShoppingCartPage = () => {
  const { cart, handleButtonClick } = useCartPage();

  if (!cart) {
    return <CartLoading />;
  }

  const cartIsNotEmpty = cart.products.length !== 0 || cart.promos.length !== 0;

  return (
    <InnerPageWrapper classNames={{ mobileWrapper: "pt-0" }}>
      <HeaderRow leftContent={`Всего ${cart.products.length}`} className="md:flex hidden xl:p-0" header="Корзина" />
      {cartIsNotEmpty ? <CartContentBlock /> : <Empty />}
      <TotalPriceCard
        buttonText="Перейти к оформлению"
        onClick={handleButtonClick}
        products={cart.products}
        promos={cart.promos}
      />
      {cartIsNotEmpty ? (
        <MobileCartInfoBlock infoBlockData={[]} buttonText={"Перейти к оформлению"} onSubmit={handleButtonClick} />
      ) : null}
    </InnerPageWrapper>
  );
};

export default ShoppingCartPage;
