import Text from "@/components/atoms/Text/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import ProductChips from "../ProductChips";
import { HeaderBreadcrumbsProps } from "./HeaderBreadcrumbs.types";

export const HeaderBreadcrumns = ({ breadcrumbs, product }: HeaderBreadcrumbsProps) => (
  <div className={"px-5 w-full sm:px-0 sm:col-span-full flex flex-col gap-3 sm:gap-2 -mb-7"}>
    <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
    <div className={"flex flex-col gap-4 sm:gap-3"}>
      <Text text={product.name} className={"md:text-[22px] xl:text-2xl hidden sm:flex font-medium"} />
      <ProductChips product={product} className={"hidden sm:flex"} />
    </div>
  </div>
);
