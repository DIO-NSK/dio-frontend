"use client";

import {
  $catalogCategoryName,
  $categoryBreadcrumbs,
  $products,
  $productsAmount,
  getCategoryBreadcrumbsFx,
} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryUrlMask]/model";
import {
  $selectedSort,
  $sendFiltersPending,
  catalogPageDidMountEvent,
  selectSortEvent,
} from "@/components/organisms/bars/catalog-left-sidebar/model";
import { selectableFilters } from "@/data/sortFilters";
import { SelectItem } from "@/types/props/SelectItem";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { useUnit } from "effector-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const useDesktopCatalogScreen = (categoryId: number) => {
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

  const isTabletBreakpoint = breakpoint === "md" || breakpoint === "lg";
  const isSmallBreakpoint = breakpoint === "init" || breakpoint === "sm";

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

  return {
    states: { filtersPending, selectedSort, breadcrumbs, categoryName, amount, products },
    breakpoints: { isTabletBreakpoint, isSmallBreakpoint },
    actions: { handleSelectSort },
  };
};
