"use client";

import CatalogLeftSidebar from "@/components/organisms/bars/catalog-left-sidebar/CatalogLeftSidebar";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";
import { useFilters } from "@/utlis/hooks/useFilters";
import { CatalogSidebarProps } from "./CatalogSidebar.types";

export const CatalogSidebar = ({ categoryId }: CatalogSidebarProps) => {
  useFilters(categoryId);

  const breakpoint = useBreakpoint();
  const isLargeScreen = breakpoint === "xl" || breakpoint === "2xl";

  return (
    <IfRenderBlock condition={isLargeScreen}>
      <CatalogLeftSidebar categoryId={categoryId} />
    </IfRenderBlock>
  );
};
