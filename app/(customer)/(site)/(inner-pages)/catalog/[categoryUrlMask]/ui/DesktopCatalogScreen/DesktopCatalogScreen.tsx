"use client";

import Button from "@/components/atoms/buttons/button/Button";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import CatalogPagination from "@/components/moleculas/pagination/CatalogPagination";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import PageContentWrapper from "@/components/wrappers/page-content-wrapper/PageContentWrapper";
import { selectableFilters } from "@/data/sortFilters";
import { FiSliders } from "react-icons/fi";
import { CatalogSidebar } from "../CatalogSidebar/CatalogSidebar";
import { TabletFilters } from "../TabletFilters/TabletFilters";
import { BreadcrumbsHeader } from "./BreadcurmbsHeader/BreadcrumbsHeader";
import { useDesktopCatalogScreen } from "./DesktopCatalogScreen.hooks";
import { DesktopCatalogScreenProps } from "./DesktopCatalogScreen.types";
import { ProductsGrid } from "./ProductsGrid/ProductsGrid";

const DesktopCatalogScreen = ({ categoryId, onOpenPopup }: DesktopCatalogScreenProps) => {
  const {
    states: { filtersPending, selectedSort, breadcrumbs, categoryName, amount, products },
    breakpoints: { isTabletBreakpoint, isSmallBreakpoint },
    actions: { handleSelectSort },
  } = useDesktopCatalogScreen(categoryId);

  return (
    <IfRenderBlock condition={breadcrumbs.length !== 0}>
      <BreadcrumbsHeader
        isSmallBreakpoint={isSmallBreakpoint}
        categoryName={categoryName}
        breadcrumbs={breadcrumbs}
        amount={amount}
      />
      <InnerPageWrapper classNames={{ mobileWrapper: "md:col-span-full" }}>
        <CatalogSidebar categoryId={categoryId} />
        <section className={"md:w-full lg:col-span-9 flex flex-col md:gap-5 xl:gap-7"}>
          <Button
            classNames={{ button: "md:hidden bg-bg-light-blue border-2 border-light-gray" }}
            icon={<FiSliders size="18px" />}
            buttonType="SECONDARY"
            onClick={onOpenPopup}
            size="sm"
          >
            Фильтры
          </Button>
          <IfRenderBlock condition={products.length !== 0}>
            <PageContentWrapper>
              <section className="w-full mt-2 md:mt-0 md:col-span-full md:grid md:grid-cols-9 md:gap-5 xl:gap-7">
                <IfRenderBlock condition={isTabletBreakpoint}>
                  <TabletFilters categoryId={categoryId} />
                </IfRenderBlock>
                <SelectInput
                  width={"w-full md:col-span-4 lg:col-span-3"}
                  placeholder="Сортировать по цене"
                  selectedItem={selectedSort}
                  onSelect={handleSelectSort}
                  items={selectableFilters}
                />
              </section>
              <ProductsGrid filtersPending={filtersPending} products={products} />
              <CatalogPagination />
            </PageContentWrapper>
          </IfRenderBlock>
        </section>
      </InnerPageWrapper>
    </IfRenderBlock>
  );
};

export default DesktopCatalogScreen;
