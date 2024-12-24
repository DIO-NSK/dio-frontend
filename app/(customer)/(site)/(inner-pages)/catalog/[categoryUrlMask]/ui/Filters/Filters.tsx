"use client";

import Button from "@/components/atoms/buttons/button/Button";
import CatalogFilters from "@/components/organisms/catalog-filters/CatalogFilters";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { useOldBreakpoint } from "@/utlis/hooks/useBreakpoint";
import { useToggle } from "@/utlis/hooks/useToggle";
import { TabletFiltersPopup } from "../TabletFiltersPopup";
import { FilterProps } from "./Filters.types";

export const Filters = ({ categoryId, onClose }: FilterProps) => {
  const breakpoint = useOldBreakpoint();
  const { state: isPopupOpen, toggleState: toggleOpen } = useToggle(false);

  if (breakpoint === "xl" || breakpoint === "2xl") {
    return <CatalogFilters categoryId={categoryId} onClose={onClose} />;
  }

  return (
    <>
      <IfRenderBlock condition={isPopupOpen}>
        <TabletFiltersPopup />
      </IfRenderBlock>
      <span className="w-full flex flex-row items-center gap-3">
        <Button buttonType="PRIMARY" onClick={toggleOpen}>
          Фильтры
        </Button>
      </span>
    </>
  );
};
