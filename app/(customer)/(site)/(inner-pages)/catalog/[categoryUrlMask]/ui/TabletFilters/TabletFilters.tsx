"use client";

import Button from "@/components/atoms/buttons/button/Button";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { useToggle } from "@/utlis/hooks/useToggle";
import { SlidersIcon } from "lucide-react";
import { TabletFiltersPopup } from "../TabletFiltersPopup";

export const TabletFilters = ({ categoryId }: { categoryId: number }) => {
  const { state: isPopupOpen, toggleState } = useToggle();

  return (
    <>
      <IfRenderBlock condition={isPopupOpen}>
        <TabletFiltersPopup />
      </IfRenderBlock>
      <Button
        classNames={{ button: "col-span-2" }}
        icon={<SlidersIcon size="18px" />}
        buttonType="SECONDARY"
        onClick={toggleState}
      >
        Фильтры
      </Button>
    </>
  );
};
