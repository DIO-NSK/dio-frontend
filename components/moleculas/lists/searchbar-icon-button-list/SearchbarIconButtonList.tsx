import React, {useEffect} from "react";
import {FiHeart, FiShoppingCart, FiUser} from "react-icons/fi";
import IconTextButton from "@/components/atoms/buttons/icon-text-button/IconTextButton";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";
import {useStore} from "@/store/Store";
import {useRouter} from "next/navigation";
import {useUnit} from "effector-react";
import {$userCredentials, getUserCredentialsEvent} from "@/app/(customer)/model";
import {$cart, getCartEvent} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import Badge from "@/components/atoms/badge/Badge";

const SearchbarIconButtonList = () => {

    const router = useRouter()
    const switchPopupState = useStore(state => state.switchPopupState)

    const [cart, getCart, userCredentials, getUserCredentials]
        = useUnit([$cart, getCartEvent, $userCredentials, getUserCredentialsEvent])

    const productsInCart = cart?.products.reduce((acc, item) => acc + item.quantity, 0)
    const promosInCart = cart?.promos.reduce((acc, item) => acc + item.quantity, 0)
    const itemsInCart = (promosInCart ?? 0) + (productsInCart ?? 0);

    const buttonListData = [
        {
            name: userCredentials?.fullName.split(" ")[1] ?? "Войти",
            icon: <FiUser size={"20px"} className={"text-link-blue"}/>,
            onClick: () => {
                userCredentials ? router.push('/profile')
                    : switchPopupState("login")
            }
        },
        {
            name: "Избранное",
            icon: <FiHeart size={"20px"}/>,
            onClick: () => {
                if (userCredentials) router.push("/favorites")
                else switchPopupState("login")
            }

        },
        {
            name: "Корзина",
            icon: <div className={"relative"}>
                <FiShoppingCart size={"20px"}/>
                {cart && itemsInCart !== 0 ? <Badge
                    className={"absolute bottom-2 left-4 z-10"}
                    number={itemsInCart}
                /> : null}
            </div>,
            onClick: () => router.push("/cart")
        },
    ]

    useEffect(() => {
        if (!cart) getCart()
        getUserCredentials()
    }, [])

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
