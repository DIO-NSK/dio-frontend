type TabBarItem = { text : string } | { text : string, icon : React.ReactNode}

type TabBarItemProps = {
    tab: TabBarItem,
    isActive: boolean,
    setActive: (item: TabBarItem) => void,
    className ?: string
}

type SideTabBarProps = {
    tabs: TabBarItem[],
    activeTab: TabBarItem,
    setActive: (item: TabBarItem) => void,
    className ?: string
}