import React from "react";
import {FiHeart, FiShoppingCart, FiUser} from "react-icons/fi";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {useStore} from "@/store/Store";

const SearchbarIconButtonList = () => {

    const setAuthPopupVisible = useStore(state => state.setAuthPopupVisible)

    const buttonListData = [
        {
            name: "Войти",
            icon: <FiUser size={"20px"} className={"stroke-link-blue"}/>,
            onClick: setAuthPopupVisible
        },
        {
            name: "Избранное",
            icon: <FiHeart size={"20px"}/>,
            onClick: () => console.log("Избранное")

        },
        {
            name: "Корзина",
            icon: <FiShoppingCart size={"20px"}/>,
            onClick: () => console.log("Корзина")
        },
    ]

    return (
        <div className={"flex flex-row items-center gap-[30px]"}>
            {
                buttonListData.map((item) => {

                    const itemCV : ClassValue = {
                        "text-link-blue" : item.name === "Войти",
                        "text-text-gray" : item.name !== "Войти"
                    }

                    return <IconTextButton
                        className={cn(itemCV)}
                        icon={item.icon} text={item.name}
                        onClick={item.onClick}
                    />

                })
            }
        </div>
    )
}

export default SearchbarIconButtonList
