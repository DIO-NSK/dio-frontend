import React, {useEffect} from 'react';
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";
import Text from "@/components/atoms/text/text-base/Text";
import {useUnit} from "effector-react";
import {
    $activeSection,
    $catalog,
    $catalogPopupOpen,
    getCatalogEvent,
    selectActiveSectionEvent,
    toggleCatalogPopupEvent
} from "@/components/organisms/bars/searchbar/model";
import {CustomScroll} from "react-custom-scroll";

const SubcategoryItem = ({text}: { text: string }) => {
    return (
        <Text
            className={"text-base text-text-gray pointer hoverable hover:text-link-blue"}
            text={text}
        />
    )
}

const CatalogPopup = () => {

    const [activeSection, selectTabBar] = useUnit([$activeSection, selectActiveSectionEvent])
    const [popupOpen, togglePopup] = useUnit([$catalogPopupOpen, toggleCatalogPopupEvent])
    const [getCatalog, catalog] = useUnit([getCatalogEvent, $catalog])

    const activeTab: TabBarItem | undefined = activeSection ? {text: activeSection.name} : undefined
    const tabs: TabBarItem[] = catalog.map(item => ({text: item.name} as TabBarItem))

    useEffect(() => {
        popupOpen && getCatalog()
    }, [popupOpen])

    if (popupOpen) return (
        <PopupWrapper
            onClose={togglePopup}
            classNames={{
                wrapper: "justify-start mt-0",
                content: {
                    wrapper: "top-0 h-full",
                    card: "rounded-none"
                }
            }}
        >
            {
                activeSection && <div className={"px-3 bg-white flex flex-row gap-8"}>
                    <SideTabBar
                        className={"pr-8 h-[calc(100vh-64px)] overflow-y-scroll"}
                        tabs={tabs}
                        activeTab={activeTab!!}
                        setActive={selectTabBar}
                    />
                    <div className={"min-w-[300px] flex pt-3 flex-col gap-5"}>
                        {
                            activeTab && <Text
                                className={"text-lg text-black font-medium"}
                                text={activeTab.text}
                            />
                        }
                        {
                            activeSection.categories.map((item) =>
                                <SubcategoryItem text={item.name}/>)
                        }
                    </div>
                </div>
            }

        </PopupWrapper>
    );
};

export default CatalogPopup;
