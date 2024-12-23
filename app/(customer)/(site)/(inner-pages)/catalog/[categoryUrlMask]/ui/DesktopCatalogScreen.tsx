"use client";

import {
  $catalogCategoryName,
  $categoryBreadcrumbs,
  $categoryBreadcrumbsPending,
  $products,
  $productsAmount,
  getCategoryBreadcrumbsFx,
} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryUrlMask]/model";
import { TabletFiltersPopup } from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryUrlMask]/ui/TabletFiltersPopup";
import Button from "@/components/atoms/buttons/button/Button";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import Text from "@/components/atoms/Text/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import CatalogPagination from "@/components/moleculas/pagination/CatalogPagination";
import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";
import {
  $selectedSort,
  $sendFiltersPending,
  catalogPageDidMountEvent,
  selectSortEvent,
} from "@/components/organisms/bars/catalog-left-sidebar/model";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import SkeletonProductCard from "@/components/organisms/cards/product-card/SkeletonProductCard/SkeletonProductCard";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import PageContentWrapper from "@/components/wrappers/page-content-wrapper/PageContentWrapper";
import { selectableFilters } from "@/data/sortFilters";
import { SelectItem } from "@/types/props/SelectItem";
import useBreakpoint, { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { useFilters } from "@/utlis/hooks/useFilters";
import { useToggle } from "@/utlis/hooks/useToggle";
import { useUnit } from "effector-react";
import { SlidersIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { FiSliders } from "react-icons/fi";

const SkeletonProductCardList = () =>
  Array.from({ length: 12 }, (_, i) => i).map((_, key) => <SkeletonProductCard key={key} />);

const TabletFilters = ({ categoryId }: { categoryId: number }) => {
  const { state: isPopupOpen, toggleState } = useToggle();

  return (
    <>
      {isPopupOpen ? <TabletFiltersPopup /> : null}
      <Button
        buttonType={"SECONDARY"}
        onClick={toggleState}
        text={"Фильтры"}
        icon={<SlidersIcon size={"18px"} />}
        classNames={{ button: "col-span-2" }}
      />
    </>
  );
};

const CatalogSidebar = ({ categoryId }: { categoryId: number }) => {
  useFilters(categoryId);
  const breakpoint = useBreakpoint();

  return breakpoint === "xl" || breakpoint === "2xl" ? <CatalogLeftSidebar categoryId={categoryId} /> : null;
};

const DesktopCatalogScreen = ({ categoryId, onOpenPopup }: { categoryId: number; onOpenPopup: () => void }) => {
  const breakpoint = useOldBreakpoint();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageDidMount = useUnit(catalogPageDidMountEvent);
  const filtersPending = useUnit($sendFiltersPending);
  const [selectedSort, onSelectSort] = useUnit([$selectedSort, selectSortEvent]);
  const [breadcrumbs, categoryName, getBreadcrumbs] = useUnit([
    $categoryBreadcrumbs,
    $catalogCategoryName,
    getCategoryBreadcrumbsFx,
  ]);
  
  const [amount, products] = useUnit([$productsAmount, $products]);

  const handleSelectSort = (item: SelectItem<string>) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", item.value);
    params.set("page", "1");
    router.replace(pathname.concat(`?${params.toString()}`));
    onSelectSort(item);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", "price,asc");
    params.set("page", "1");
    router.replace(pathname.concat(`?${params.toString()}`));
    onSelectSort(selectableFilters[0]);
  }, []);

  useEffect(() => {
    pageDidMount();
    getBreadcrumbs(categoryId);
  }, []);

  if (breadcrumbs.length)
    return (
      <React.Fragment>
        <section
          className={"w-full gap-3 md:gap-2 xl:gap-0 px-5 md:px-[24px] lg:px-0 xl:px-0 sm:col-span-full flex flex-col"}
        >
          {breakpoint === "init" || breakpoint === "sm" ? <CatalogBreadcrumbs breadcrumbs={breadcrumbs} /> : null}
          <div className={"w-full flex flex-col items-baseline md:flex-row md:gap-3"}>
            <Text text={categoryName} className={"text-lg sm:text-2xl font-medium"} />
            <Text text={`Всего ${amount} шт.`} className={"text-base text-text-gray"} />
          </div>
          {breakpoint !== "init" && breakpoint !== "sm" ? <CatalogBreadcrumbs breadcrumbs={breadcrumbs} /> : null}
        </section>
        <InnerPageWrapper classNames={{ mobileWrapper: "md:col-span-full" }}>
          <CatalogSidebar categoryId={categoryId} />
          <section className={"md:w-full lg:col-span-9 flex flex-col md:gap-5 xl:gap-7"}>
            <Button
              classNames={{ button: "md:hidden bg-bg-light-blue border-2 border-light-gray" }}
              text={"Фильтры"}
              onClick={onOpenPopup}
              icon={<FiSliders size={"18px"} />}
              buttonType={"SECONDARY"}
              size={"sm"}
            />
            <PageContentWrapper>
              <section className={"w-full mt-2 md:mt-0 md:col-span-full md:grid md:grid-cols-9 md:gap-5 xl:gap-7"}>
                {breakpoint === "md" || breakpoint === "lg" ? <TabletFilters categoryId={categoryId} /> : null}
                <SelectInput
                  width={"w-full md:col-span-4 lg:col-span-3"}
                  placeholder={"Сортировать по цене"}
                  items={selectableFilters}
                  selectedItem={selectedSort}
                  onSelect={handleSelectSort}
                />
              </section>
              {filtersPending ? (
                <SkeletonProductCardList />
              ) : (
                products.map((card) => {
                  return (
                    <ProductCard classNames={{ mainWrapper: "w-full", textWrapper: "min-h-0" }} productCard={card} />
                  );
                })
              )}
              <CatalogPagination />
            </PageContentWrapper>
          </section>
        </InnerPageWrapper>
      </React.Fragment>
    );
};

export default DesktopCatalogScreen;
