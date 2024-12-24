import Text from "@/components/atoms/Text/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { BreadcrumbsHeaderProps } from "./BreadcrumbsHeader.types";

export const BreadcrumbsHeader = ({ isSmallBreakpoint, categoryName, amount, breadcrumbs }: BreadcrumbsHeaderProps) => (
  <section
    className={"w-full gap-3 md:gap-2 xl:gap-0 px-5 md:px-[24px] lg:px-0 xl:px-0 sm:col-span-full flex flex-col"}
  >
    <IfRenderBlock condition={isSmallBreakpoint}>
      <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
    </IfRenderBlock>
    <div className="w-full flex flex-col items-baseline md:flex-row md:gap-3">
      <Text className="text-lg sm:text-2xl font-medium">{categoryName}</Text>
      <Text className="text-base text-text-gray">Всего {amount} шт.</Text>
    </div>
    <IfRenderBlock condition={!isSmallBreakpoint}>
      <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
    </IfRenderBlock>
  </section>
);
