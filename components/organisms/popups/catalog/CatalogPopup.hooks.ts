import {Category} from "@/types/dto/Category";
import {useEffect, useState} from "react";
import {categories, initSubcategories} from "@/data/catalogData";
import {useUnit} from "effector-react";
import {
    $catalog,
    $catalogPopupOpen,
    getCatalogEvent,
    toggleCatalogPopupEvent
} from "@/components/organisms/bars/searchbar/model";

export const useCatalogPopup = () => {}