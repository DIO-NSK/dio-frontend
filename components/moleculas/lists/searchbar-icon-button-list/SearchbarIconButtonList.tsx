import React, {useEffect, useState} from "react";
import {FiHeart, FiShoppingCart, FiUser} from "react-icons/fi";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {useStore} from "@/store/Store";
import {useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$userCredentials} from "@/app/(customer)/model";

const SearchbarIconButtonList = () => {

    const userCredentials = useUnit($userCredentials)

    const router = useRouter()
    const switchPopupState = useStore(state => state.switchPopupState)

    const [userName, setUserName] = useState<string>("Войти")

    const buttonListData = [
        {
            name: userName,
            icon: <FiUser size={"20px"} className={"text-link-blue"}/>,
            onClick: () => {
                userCredentials ? router.push('/profile')
                    : switchPopupState("login")
            }
        },
        {
            name: "Избранное",
            icon: <FiHeart size={"20px"}/>,
            onClick: () => router.push("/favorites")

        },
        {
            name: "Корзина",
            icon: <FiShoppingCart size={"20px"}/>,
            onClick: () => router.push("/cart")
        },
    ]

    useEffect(() => {
        if (userCredentials) {
            const username : string = userCredentials.fullName.split(" ")[1]
            setUserName(username)
        }
    }, [userCredentials])

    return (
        <div className={"flex flex-row items-center gap-[30px]"}>
            {
                buttonListData.map((item, key) => {

                    const itemCV: ClassValue = {
                        "text-link-blue": key === 0,
                        "text-text-gray": key !== 0
                    }

                    return <IconTextButton
                        className={cn(itemCV)}
                        icon={item.icon} text={item.name}
                        onClick={item.onClick}
                        key={key}
                    />

                })
            }
        </div>
    )
}

export default SearchbarIconButtonList
