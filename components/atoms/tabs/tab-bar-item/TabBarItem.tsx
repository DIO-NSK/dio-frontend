import React, {PropsWithChildren} from 'react';
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {TabBarItemProps} from "@/types/props/SideTabBar";
import Link from "next/link";

const wrapperStyle = (isActive: boolean): ClassValue[] => [
    "w-full flex flex-row items-center text-start gap-3 px-4 py-4 text-base rounded-xl",
    "hoverable pointer hover:bg-bg-light-blue bg-white text-black",
    {"bg-bg-light-blue text-link-blue": isActive}
]

const TabBarItemWrapper = (props: PropsWithChildren<TabBarItemProps>) => (
    props.tab.path ? (
        <Link
            onClick={props.onClick}
            onPointerOver={() => props.isHoverable && props.setActive(props.tab)}
            className={cn(wrapperStyle(props.isActive))}
            href={props.tab.path}
        >
            {props.children}
        </Link>
    ) : (
        <button
            className={cn(wrapperStyle(props.isActive))}
            onClick={() => props.setActive(props.tab)}
        >
            {props.children}
        </button>
    )
)

const TabBarItem = (props: TabBarItemProps) => (
    <TabBarItemWrapper {...props}>
        {props.tab?.icon}
        {props.tab.text}
    </TabBarItemWrapper>
)

export default TabBarItem;
