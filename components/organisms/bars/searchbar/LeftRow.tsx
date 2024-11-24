"use client";

import Button from "@/components/atoms/buttons/button/Button";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import {
  $searchValue,
  searchCatalogByNameEvent,
  toggleCatalogPopupEvent,
} from "@/components/organisms/bars/searchbar/model";
import { UseSearchbarReturn } from "@/components/organisms/bars/searchbar/Searchbar.hooks";
import { useUnit } from "effector-react";
import { FiMenu } from "react-icons/fi";

export const LeftRow = ({ isLaptop }: Partial<UseSearchbarReturn>) => {
  const [name, setName, toggleCatalogPopup] = useUnit([
    $searchValue,
    searchCatalogByNameEvent,
    toggleCatalogPopupEvent,
  ]);

  return (
    <div className={"w-full flex flex-row lg:gap-3 xl:gap-[20px] items-center"}>
      <Button
        classNames={{
          button: "lg:p-0 lg:size-[52px] xl:px-[50px] xl:h-[60px] xl:w-fit rounded-lg xl:rounded-xl",
        }}
        icon={<FiMenu className={"stroke-white size-5"} />}
        text={isLaptop ? "Каталог" : undefined}
        onClick={toggleCatalogPopup}
      />
      <SearchInput hasPopover hasLink placeholder={"Поиск товаров"} onChange={setName} value={name} />
    </div>
  );
};
