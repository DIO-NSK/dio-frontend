import { getSales } from "@/app/(customer)/(site)/(inner-pages)/sales/page.hooks";
import { getSeoByUrlMask } from "@/app/admin/seo/page.api";
import Text from "@/components/atoms/Text/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import SalesContentBlock from "@/components/organisms/loading-blocks/sales/SalesContentBlock";
import SkeletonSaleCard from "@/components/organisms/loading-blocks/sales/SkeletonSaleCard";
import { ResponsivePageWrapper } from "@/components/wrappers/responsive-page-wrapper/ResponsivePageWrapper";
import { TextLink } from "@/types/dto/text";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async (): Promise<Metadata> => {
  const { title, keywords, description } = await getSeoByUrlMask(__dirname.split("/").at(-1) as string);

  return {
    title: title,
    keywords: keywords,
    description: description,
  };
};

const breadcrumbs: TextLink[] = [
  { text: "Главная", link: "/" },
  { text: "Акции", link: "/sales" },
];

const Loading = () => Array.from({ length: 4 }).map((_, index) => <SkeletonSaleCard key={index} />);

const SaleCatalogScreen = async () => {
  const sales = await getSales();

  return (
    <ResponsivePageWrapper>
      <section className={"w-full col-span-full flex flex-col md:gap-2 xl:gap-0 md:mt-0"}>
        <Text text={"Акции"} className={"text-lg sm:text-2xl font-medium leading-none"} />
        <div className={"w-full -mt-1 sm:pt-0"}>
          <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </section>
      <Suspense fallback={<Loading />}>
        <SalesContentBlock sales={sales} />
      </Suspense>
    </ResponsivePageWrapper>
  );
};

export default SaleCatalogScreen;
