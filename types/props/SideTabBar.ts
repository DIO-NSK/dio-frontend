type TabBarItem = any & { text: string }

type TabBarItemProps = {
    tab: TabBarItem,
    isActive: boolean,
    setActive: (item: TabBarItem) => void
}

type SideTabBarProps = {
    tabs: TabBarItem[],
    activeTab: TabBarItem,
    setActive: (item: TabBarItem) => void,
    className ?: string
}