"use client"

import style from "./Searchbar.module.css"
import Image from "next/image";

import DIOLogo from "@/public/images/dio-logo.png"
import Button from "@/components/atoms/buttons/button/Button";
import {FiMenu} from "react-icons/fi";
import SearchInput from "@/components/atoms/inputs/search-input/SearchInput";
import {useState} from "react";
import SearchbarIconButtonList from "@/components/moleculas/searchbar-icon-button-list/SearchbarIconButtonList";

const Searchbar = () => {

    const [inputValue, setInputValue] = useState<string>("")

    return (
        <div className={style.wrapper}>
            <Image
                src={DIOLogo.src}
                width={50}
                height={50}
                quality={100}
                alt={'/'}
            />
            <div className={style.buttonRow}>
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
