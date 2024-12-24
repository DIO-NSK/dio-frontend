"use client";

import { useToggle } from "@/utlis/hooks/useToggle";
import DesktopCatalogScreen from "../DesktopCatalogScreen/DesktopCatalogScreen";
import { Filters } from "../Filters/Filters";
import { ClientCatalogScreenProps } from "./ClientCatalogScreen.types";

export const ClientCatalogScreen = ({ categoryId }: ClientCatalogScreenProps) => {
  const { state, toggleState } = useToggle();

  if (state) {
    return <Filters categoryId={categoryId} onClose={toggleState} />;
  }

  return <DesktopCatalogScreen onOpenPopup={toggleState} categoryId={categoryId} />;
};
