import {Group, services} from "@/data/static/services";
import {SelectItem} from "@/types/props/SelectItem";
import {useEffect, useState} from "react";
import {ServiceCardDTO} from "@/types/cards";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { TabBarItem } from "@/types/props/SideTabBar";

export const useServicesPage = () => {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentSearchParams = new URLSearchParams(Array.from(searchParams.entries()));

    const serviceType = currentSearchParams.get("type") ?? "rent"

    const tabs = services.map(s => ({text: s.groupHeader, path: s.value} as TabBarItem))
    const selectedItems = services.map((s) => ({name: s.groupHeader, value: s.value} as SelectItem<string>))

    const [activeTab, setActive] = useState<TabBarItem>(tabs[0])
    const [activeSelectItem, setActiveSelectItem] = useState<SelectItem<string>>(selectedItems[0])

    const [serviceGroup, setServiceGroup] = useState<Group<ServiceCardDTO>>()

    useEffect(() => {
        currentSearchParams.set('type', activeTab.path!!)
        const search = currentSearchParams.toString()
        router.push(`${pathname}?${search}`)
    }, [activeTab])

    useEffect(() => {
        currentSearchParams.set('type', activeSelectItem.value)
        const search = currentSearchParams.toString()
        router.push(`${pathname}?${search}`)
    }, [activeSelectItem])

    useEffect(() => {
        const initialServiceGroup = services.find(service => service.value === serviceType)!!
        setServiceGroup(initialServiceGroup)
        setActive(tabs.find(tab => tab.text === initialServiceGroup.groupHeader)!!)
        setActiveSelectItem(selectedItems.find(item => item.name === initialServiceGroup.groupHeader)!!)
    }, [serviceType])

    return {
        sidebar: {tabs, activeTab, setActive},
        selectInput: {items: selectedItems, selectedItem: activeSelectItem, onSelect: setActiveSelectItem},
        serviceGroup
    }

}