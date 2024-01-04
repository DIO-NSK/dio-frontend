"use client"

import Image from "next/image";

import DIOLogo from "@/public/images/dio-logo.png"
import Button from "@/components/atoms/buttons/button/Button";
import {FiMenu} from "react-icons/fi";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import {useState} from "react";
import SearchbarIconButtonList from "@/components/moleculas/lists/searchbar-icon-button-list/SearchbarIconButtonList";
import {useRouter} from "next/navigation";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";

const Searchbar = () => {

    const [inputValue, setInputValue] = useState<string>("")
    const router = useRouter()

    const handleLogoClick = () => router.push("/")

    const wrapperCV : ClassValue[] = [
        "w-full px-[100px] py-[20px] bg-white flex flex-row items-center gap-[30px]",
        "sticky top-[0px] z-30"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <Image
                src={DIOLogo.src}
                width={50} height={50}
                quality={100} alt={'/'}
                className={"pointer"}
                onClick={handleLogoClick}
            />
            <div className={"w-full flex flex-row gap-[20px] items-center"}>
                <Button
                    text={"Каталог"}
                    onClick={() => console.log("CATALOG OPEN")}
                    icon={
                        <FiMenu
                            size={"20px"}
                            className={"stroke-white"}
                        />
                    }
                />
                <SearchInput
                    placeholder={"Поиск товаров"}
                    value={inputValue}
                    onChange={(newValue) => setInputValue(newValue)}
                />
            </div>
            <SearchbarIconButtonList/>
        </div>
    )
}

export default Searchbar
