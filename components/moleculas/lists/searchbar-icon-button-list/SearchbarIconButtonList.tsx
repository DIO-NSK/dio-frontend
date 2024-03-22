import React, {useEffect, useState} from "react";
import {FiHeart, FiShoppingCart, FiUser} from "react-icons/fi";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {useStore} from "@/store/Store";
import {useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {getUserCredentialsFx} from "@/app/(customer)/model";
import {$cart} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import Badge from "@/components/atoms/badge/Badge";

const SearchbarIconButtonList = () => {

    const router = useRouter()
    const switchPopupState = useStore(state => state.switchPopupState)
    const accessToken = localStorage.getItem("ACCESS_TOKEN")

    const [cart, getUserCredentials] = useUnit([$cart, getUserCredentialsFx])
    const [userName, setUserName] = useState<string>("Войти")

    const buttonListData = [
        {
            name: userName,
            icon: <FiUser size={"20px"} className={"text-link-blue"}/>,
            onClick: () => {
                accessToken ? router.push('/profile')
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
            icon: <div className={"relative"}>
                <FiShoppingCart size={"20px"}/>
                {
                    cart && cart.responseCart.products.length !== 0
                    && <Badge
                        number={cart.responseCart.products.reduce((acc, item) => acc + item.quantity, 0)}
                        className={"absolute bottom-2 left-4 z-10"}
                    />
                }
            </div>,
            onClick: () => router.push("/cart")
        },
    ]

    useEffect(() => {
        getUserCredentials()
            .then(credentials => setUserName(credentials.fullName.split(" ")[1]))
            .catch(console.log)
    }, [accessToken])

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
