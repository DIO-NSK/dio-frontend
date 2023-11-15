import style from "./ServiceTabBar.module.css"
import {TextLink} from "@/types/links";
import TextBase from "@/components/atoms/text/text-base/TextBase";
import {COLOR} from "@/components/colors";

const Item = ({tab, isActive, setActive}: {
    tab: TextLink,
    isActive: boolean,
    setActive: (item: TextLink) => void
}) => {

    const tabColor = isActive ? COLOR["bg-light-blue"] : COLOR["white"]
    const textColor = isActive ? COLOR["link-blue"] : COLOR["black"]

    return (
        <div
            style={{backgroundColor: tabColor}}
            className={style.item}
            onClick={() => setActive(tab)}
        >
            <TextBase text={tab.text} color={textColor}/>
        </div>
    )

}

const ServiceTabBar = ({tabs, activeTab, setActive}: {
    tabs: TextLink[],
    activeTab: TextLink,
    setActive: (item: TextLink) => void
}) => {
    return (
        <div className={style.wrapper}>
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
