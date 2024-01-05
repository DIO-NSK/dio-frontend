import {TextLink} from "@/types/links";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const Item = ({tab, isActive, setActive}: {
    tab: TextLink,
    isActive: boolean,
    setActive: (item: TextLink) => void
}) => {

    const wrapperCV : ClassValue[] = [
        "w-full flex flex-row items-center px-[20px] py-4 text-base rounded-xl hoverable pointer",
        "hover:bg-bg-light-blue",
        {
            "bg-bg-light-blue text-link-blue" : isActive,
            "bg-white text-black" : !isActive
        }
    ]

    return (
        <div
            className={cn(wrapperCV)}
            onClick={() => setActive(tab)}
        >
            {tab.text}
        </div>
    )

}

const ServiceTabBar = ({tabs, activeTab, setActive}: {
    tabs: TextLink[],
    activeTab: TextLink,
    setActive: (item: TextLink) => void
}) => {
    return (
        <div className={"ml-[-20px] col-span-3 flex flex-col gap-2"}>
            {
                tabs.map((tab) => {
                    return <ServiceTabBar.Item
                        tab={tab}
                        isActive={tab.text === activeTab.text}
                        setActive={setActive}
                    />
                })
            }
        </div>
    )
}

ServiceTabBar.Item = Item

export default ServiceTabBar
