import React from "react";
import {FiHeart, FiShoppingCart, FiUser} from "react-icons/fi";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {COLOR} from "@/components/colors";

const SearchbarIconButtonList = () => {

    const buttonListData = [
        {
            name: "Войти",
            icon: <FiUser size={"20px"} className={"stroke-link-blue"}/>,
            onClick: () => console.log("Войти")
        },
        {
            name: "Избранное",
            icon: <FiHeart size={"20px"} className={"stroke-text-gray"}/>,
            onClick: () => console.log("Избранное")

        },
        {
            name: "Корзина",
            icon: <FiShoppingCart size={"20px"} className={"stroke-text-gray"}/>,
            onClick: () => console.log("Корзина")
        },
    ]

    return (
        <div className={"flex flex-row items-center gap-[30px]"}>
            {
                buttonListData.map((item) => {
                    return <IconTextButton
                        color={
                            item.name == "Войти" ? COLOR["link-blue"]
                                : COLOR["text-gray"]
                        }
                        icon={item.icon}
                        text={item.name}
                        onClick={() => item.onClick()}
                    />
                })
            }
        </div>
    )
}

export default SearchbarIconButtonList
