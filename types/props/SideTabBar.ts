type TabBarItem = { text: string, icon?: React.ReactNode, path?: string }

type TabBarItemProps = {
    tab: TabBarItem,
    isActive: boolean,
    setActive: (item: TabBarItem) => void,
    className?: string
}

type SideTabBarProps = {
    tabs: TabBarItem[],
    activeTab: TabBarItem,
    setActive: (item: TabBarItem) => void,
    className?: string
}