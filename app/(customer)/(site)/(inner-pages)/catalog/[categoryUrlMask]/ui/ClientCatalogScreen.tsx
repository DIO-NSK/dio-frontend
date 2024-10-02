"use client";

import DesktopCatalogScreen from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryUrlMask]/ui/DesktopCatalogScreen";
import Button from "@/components/atoms/buttons/button/Button";
import CatalogFilters from "@/components/organisms/catalog-filters/CatalogFilters";
import useBreakpoint from "@/utlis/hooks/useBreakpoint";
import { useToggle } from "@/utlis/hooks/useToggle";
import { TabletFiltersPopup } from "../ui/TabletFiltersPopup";

interface FilterProps {
    categoryId: number;
    onClose: () => void;
}

const Filters = ({ categoryId, onClose }: FilterProps) => {
    const breakpoint = useBreakpoint();
    const { state: isPopupOpen, toggleState: toggleOpen } = useToggle(false);

    if (breakpoint === 'xl') {
        return (
            <CatalogFilters categoryId={categoryId} onClose={onClose} />
        )
    }

    return (
        <>
            {isPopupOpen ? <TabletFiltersPopup /> : null}
            <span className='w-full flex flex-row items-center gap-3'>
                <Button buttonType='PRIMARY' text={'Фильтры'} onClick={toggleOpen} />
            </span>
        </>
    )
}

const ClientCatalogScreen = ({ categoryId, categoryUrlMask}: { categoryId: number, categoryUrlMask : string }) => {
    const popupToggle = useToggle()

    if (popupToggle.state) {
        return (
            <Filters categoryId={categoryId} onClose={popupToggle.toggleState} />
        )
    }

    return (
        <DesktopCatalogScreen onOpenPopup={popupToggle.toggleState} categoryId={categoryId} categoryUrlMask={categoryUrlMask}/>
    )
};

export default ClientCatalogScreen;
