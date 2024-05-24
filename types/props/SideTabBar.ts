import {PropsWithClassName} from "@/types/props/utils/PropsWithClassName";

export type TabBarItemProps = PropsWithClassName<{
    tab: TabBarItem,
    setActive: (item: TabBarItem) => void,
    isActive: boolean,
    onClick?: () => void,
    isHoverable?: boolean
}>

export type TabBarItem = { text: string, icon?: React.ReactNode, path?: string }