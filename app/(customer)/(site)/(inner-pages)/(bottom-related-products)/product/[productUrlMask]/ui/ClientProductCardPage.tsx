"use client";

import {
  $breadcrumbs,
  $product,
  getBreadcrumbsEvent,
  getProductFx,
  productPageDidMountEvent,
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productUrlMask]/model";
import MobileProductStickyButton from "@/components/atoms/buttons/MobileProductStickyButton";
import MobilePhotoSlider from "@/components/mobile/organisms/MobilePhotoSlider/MobilePhotoSlider";
import MobilePhotoGalleryPopup from "@/components/mobile/popups/photo-gallery-popup/MobilePhotoGalleryPopup";
import DescriptionCol from "@/components/moleculas/cols/description-col/DescriptionCol";
import CharacteristicList from "@/components/moleculas/lists/characteristic-list/CharacteristicList";
import ProductPhotoSlider from "@/components/moleculas/sliders/ProductPhotoSlider/ProductPhotoSlider";
import ProductPriceCard from "@/components/organisms/cards/product-price-card/ProductPriceCard";
import HeaderBlock from "@/components/wrappers/header-block/HeaderBlock";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { useToggle } from "@/utlis/hooks/useToggle";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { ClientProductCardPageLoading } from "./ClientProductCardPage.loading";
import { HeaderBreadcrumns } from "./HeaderBreadcrumbs/HeaderBreadcrumbs";
import MobileHeaderRow from "./MobileHeaderRow";

const ClientProductCardPage = ({ productId }: { productId: number }) => {
  const breakpoint = useOldBreakpoint();
  const [breadcrumbs, getBreadcrumbs] = useUnit([$breadcrumbs, getBreadcrumbsEvent]);
  const [pageDidMount, product, getProduct] = useUnit([productPageDidMountEvent, $product, getProductFx]);
  const popupToggle = useToggle();

  useEffect(() => {
    pageDidMount();
    getBreadcrumbs(productId);
    getProduct(productId);
  }, []);

  const isLargeScreen = breakpoint === "xl" || breakpoint === "2xl";

  if (!product) return <ClientProductCardPageLoading />;

  return (
    <section className="w-full flex flex-col">
      <IfRenderBlock condition={popupToggle.state}>
        <MobilePhotoGalleryPopup photos={product.photos} onClose={popupToggle.toggleState} />
      </IfRenderBlock>
      <HeaderBreadcrumns product={product} breadcrumbs={breadcrumbs} />
      <InnerPageWrapper classNames={{ mobileWrapper: "px-5 -mt-7" }}>
        <div onClick={popupToggle.toggleState}>
          <MobilePhotoSlider
            photos={product?.photos.map((photo) => ({ image: photo }))}
            className="my-0"
            showQuantity
          />
        </div>
        <MobileHeaderRow product={product} />
        <div className="w-full col-span-full flex flex-col gap-7 md:grid md:grid-cols-12">
          <div className="w-full flex flex-col gap-5 md:grid md:grid-cols-9 md:col-span-8 md:gap-6 xl:col-span-9 xl:gap-7">
            <ProductPhotoSlider photos={product.photos} />
            <IfRenderBlock condition={isLargeScreen}>
              <div className="w-full col-span-4 flex flex-col gap-5 px-5 sm:px-0">
                <CharacteristicList characteristics={[...product.properties, ...product.extraProperties]} />
              </div>
            </IfRenderBlock>
            <div className="w-full hidden md:flex sm:col-span-9 sm:h-[2px] sm:bg-light-gray" />
            <HeaderBlock header="Описание товара" className="w-full md:w-[calc(100vw-48px)] lg:w-full">
              <div className="w-full -mt-2">
                <DescriptionCol maxSymbols={500} text={product.description} />
              </div>
            </HeaderBlock>
            <HeaderBlock header="Характеристики товара" className="w-full md:w-[calc(100vw-48px)] lg:w-full">
              <CharacteristicList characteristics={[...product.properties, ...product.extraProperties]} />
            </HeaderBlock>
          </div>
          <ProductPriceCard product={product} />
        </div>
      </InnerPageWrapper>
      <MobileProductStickyButton id={productId} item={product} />
    </section>
  );
};

export default ClientProductCardPage;
