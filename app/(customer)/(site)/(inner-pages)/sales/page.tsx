import { getSales } from "@/app/(customer)/(site)/(inner-pages)/sales/page.hooks";
import { getSeoByUrlMask } from "@/app/admin/seo/page.api";
import Text from "@/components/atoms/Text/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import SalesContentBlock from "@/components/organisms/loading-blocks/sales/SalesContentBlock";
import SkeletonSaleCard from "@/components/organisms/loading-blocks/sales/SkeletonSaleCard";
import { ResponsivePageWrapper } from "@/components/wrappers/responsive-page-wrapper/ResponsivePageWrapper";
import { VStack } from "@chakra-ui/react";
import { Metadata } from "next";
import { Suspense } from "react";
import { breadcrumbs } from "./page.constants";

export const generateMetadata = async (): Promise<Metadata> => {
  const { title, keywords, description } = await getSeoByUrlMask(__dirname.split("/").at(-1) as string);

  return {
    title: title,
    keywords: keywords,
    description: description,
  };
};

const Loading = () => Array.from({ length: 4 }).map((_, index) => <SkeletonSaleCard key={index} />);

const SaleCatalogScreen = async () => {
  const sales = await getSales();

  return (
    <ResponsivePageWrapper>
      <VStack w="full" alignItems="start" gridColumn="1 / -1" gap={{ md: "8px", xl: "0px" }}>
        <Text text={"Акции"} className={"text-lg sm:text-2xl font-medium leading-none"} />
        <div className={"w-full -mt-1 sm:pt-0"}>
          <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </VStack>
      <Suspense fallback={<Loading />}>
        <SalesContentBlock sales={sales} />
      </Suspense>
    </ResponsivePageWrapper>
  );
};

export default SaleCatalogScreen;
