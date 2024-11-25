"use client";

import {
  $breadcrumbs,
  $product,
  getBreadcrumbsEvent,
  getProductFx,
  productPageDidMountEvent,
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productUrlMask]/model";
import ProductChips from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/product/[productUrlMask]/ui/ProductChips";
import MobileProductStickyButton from "@/components/atoms/buttons/MobileProductStickyButton";
import Text from "@/components/atoms/Text/Text";
import Loading from "@/components/mobile/loading/Loading";
import MobilePhotoSlider from "@/components/mobile/organisms/photo-slider/MobilePhotoSlider";
import MobilePhotoGalleryPopup from "@/components/mobile/popups/photo-gallery-popup/MobilePhotoGalleryPopup";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import DescriptionCol from "@/components/moleculas/cols/description-col/DescriptionCol";
import CharacteristicList from "@/components/moleculas/lists/characteristic-list/CharacteristicList";
import ProductPhotoSlider from "@/components/moleculas/sliders/product-photo-slider/ProductPhotoSlider";
import ProductPriceCard from "@/components/organisms/cards/product-price-card/ProductPriceCard";
import HeaderBlock from "@/components/wrappers/header-block/HeaderBlock";
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { useToggle } from "@/utlis/hooks/useToggle";
import { useUnit } from "effector-react";
import { useEffect } from "react";
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

  if (!product) return <Loading />;

  return (
    <section className={"w-full flex flex-col"}>
      {popupToggle.state && <MobilePhotoGalleryPopup photos={product.photos} onClose={popupToggle.toggleState} />}

      <InnerPageWrapper classNames={{ mobileWrapper: "px-5 -mt-7" }}>
        <div className={"px-5 w-full sm:px-0 sm:col-span-full flex flex-col gap-3 sm:gap-2 -mb-7"}>
          <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
          <div className={"flex flex-col gap-4 sm:gap-3"}>
            <Text text={product.name} className={"md:text-[22px] xl:text-2xl hidden sm:flex font-medium"} />
            <ProductChips product={product} className={"hidden sm:flex"} />
          </div>
        </div>
        <div onClick={popupToggle.toggleState}>
          <MobilePhotoSlider
            photos={product?.photos.map((photo) => ({ image: photo }))}
            className={"my-0"}
            showQuantity
          />
        </div>
        <MobileHeaderRow product={product} />
        <div className={"w-full col-span-full flex flex-col gap-7 md:grid md:grid-cols-12"}>
          <div
            className={
              "w-full flex flex-col gap-5 md:grid md:grid-cols-9 md:col-span-8 md:gap-6 xl:col-span-9 xl:gap-7"
            }
          >
            <ProductPhotoSlider photos={product.photos} />
            {breakpoint === "xl" || breakpoint === "2xl" ? (
              <div className={"w-full col-span-4 flex flex-col gap-5 px-5 sm:px-0"}>
                <CharacteristicList characteristics={[...product.properties, ...product.extraProperties]} />
              </div>
            ) : null}
            <div className={"w-full hidden md:flex sm:col-span-9 sm:h-[2px] sm:bg-light-gray"} />
            <HeaderBlock header={"Описание товара"} className={"w-full md:w-[calc(100vw-48px)] lg:w-full"}>
              <div className={"w-full -mt-2"}>
                <DescriptionCol maxSymbols={500} text={product.description} />
              </div>
            </HeaderBlock>
            <HeaderBlock header={"Характеристики товара"} className={"w-full md:w-[calc(100vw-48px)] lg:w-full"}>
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
