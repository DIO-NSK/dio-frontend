import CardBulletCol from "@/components/moleculas/cols/card-bullet-col/CardBulletCol";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SliderGroup from "@/components/wrappers/SliderGroup/SliderGroup";
import { TextLink } from "@/types/dto/text";
import { cn } from "@/utlis/cn";

import { getSeoByUrlMask } from "@/app/admin/seo/page.api";
import MobileProductStickyButton from "@/components/atoms/buttons/MobileProductStickyButton";
import { VStack } from "@chakra-ui/react";
import { Metadata } from "next";
import { getSaleById, getSales } from "../page.hooks";
import { Description } from "./components/Description/Description";
import { Header } from "./components/Header/Header";
import { PhotoSlider } from "./components/PhotoSlider/PhotoSlider";
import { SaleCardMobileInfoBlock } from "./components/SaleCardMobileInfoBlock";
import { SalePriceCard } from "./components/SalePriceCard/SalePriceCard";

const productCardCV = {
  mainWrapper: cn(["sm:border-2 sm:border-light-gray sm:scale-[0.95]", "sm:hover:scale-[0.95] sm:w-full"]),
};

export const generateStaticParams = async () => {
  const sales = await getSales();
  return sales.map((sale) => ({ saleUrlMask: (sale as any).urlMask }));
};

export const generateMetadata = async ({
  params: { saleUrlMask },
}: {
  params: { saleUrlMask: string };
}): Promise<Metadata> => {
  const { title, description, keywords } = await getSeoByUrlMask(saleUrlMask);

  return {
    title: title,
    description: description,
    keywords: keywords,
  };
};

const SalePage = async ({ params: { saleUrlMask } }: { params: { saleUrlMask: string } }) => {
  const { entityId: saleId } = await getSeoByUrlMask(saleUrlMask);
  const sale = await getSaleById(saleId as number);

  const breadcrumbs: TextLink[] = [
    { text: "Главная", link: "/" },
    { text: "Акции", link: "/sales" },
    { text: sale?.name ?? "", link: `/sales/${saleUrlMask}` },
  ];

  return (
    <VStack alignItems="start" w="full" md={{ gridColumn: "1 / -1" }} gap={{ base: "20px", xl: "28px" }}>
      <div
        className={"px-5 md:px-6 lg:px-0 xl:px-0 w-full sm:col-span-full sm:grid sm:grid-cols-12 sm:gap-5 xl:gap-y-7"}
      >
        <Header sale={sale} breadcrumbs={breadcrumbs} />
        <VStack
          gridColumn={["1 / -1", "1 / -1", "span 8 / span 8", "span 8 / span 8", "span 9 / span 9"]}
          gap={{ base: "20px", xl: "28px" }}
          alignItems="start"
          w="full"
        >
          <PhotoSlider sale={sale} />
          <Description sale={sale} />
          <CardBulletCol header="Для участия в акции" items={sale.ruleList} />
        </VStack>
        <SalePriceCard sale={sale} saleId={saleId as number} />
      </div>
      <div className={"w-full md:px-6 lg:px-0 xl:px-0 py-7 border-y-2 border-light-gray"}>
        <SliderGroup headerSize={"sm"} header={"Товары, участвующие в акции"}>
          {sale.products?.map((product, index) => (
            <ProductCard classNames={productCardCV} productCard={product} key={index} />
          ))}
        </SliderGroup>
      </div>
      <SaleCardMobileInfoBlock sale={sale} saleId={saleId as number} />
      <MobileProductStickyButton item={sale} id={saleId as number} />
    </VStack>
  );
};

export default SalePage;
