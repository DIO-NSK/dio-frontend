import React from 'react';
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import SideTabBar from "@/components/moleculas/bars/side-tab-bar/SideTabBar";
import {useCatalogPopup} from "@/components/organisms/popups/catalog/CatalogPopup.hooks";
import Text from "@/components/atoms/text/text-base/Text";

const SubcategoryItem = ({text}: { text: string }) => {
    return (
        <Text
            className={"text-base text-text-gray pointer hoverable hover:text-link-blue"}
            text={text}
        />
    )
}

const CatalogPopup = ({onClose}: { onClose: () => void }) => {

    const {...popupContext} = useCatalogPopup()

    return (
        <PopupWrapper
            onClose={onClose}
            classNames={{
                wrapper: "justify-start mt-0",
                content: {
                    wrapper : "top-0",
                    card : "rounded-none"
                }
            }}
        >
            <div className={"px-3 bg-white flex flex-row gap-8"}>
                <SideTabBar
                    className={"pr-8 border-r-2 border-light-gray overflow-y-scroll"}
                    tabs={popupContext.categoriesSidebar.categories}
                    activeTab={popupContext.categoriesSidebar.activeTab}
                    setActive={popupContext.categoriesSidebar.setActiveTab}
                />
                <div className={"flex pt-3 flex-col gap-8"}>
                    <Text
                        text={popupContext.categoriesSidebar.activeTab.text}
                        className={"text-lg text-black font-medium"}
                    />
                    {
                        popupContext.subcategories && popupContext.subcategories.items
                            .map((item) => <SubcategoryItem text={item}/>)
                    }
                </div>
            </div>
        </PopupWrapper>
    );
};

export default CatalogPopup;
