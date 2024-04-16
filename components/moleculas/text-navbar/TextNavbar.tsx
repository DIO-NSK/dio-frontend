"use client"

import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {ClassValue} from "clsx";
import {TextAction, TextLink} from "@/types/dto/text";
import {useRouter} from "next/navigation";
import React from "react";
import CallRequestPopup from "@/components/organisms/popups/call-request/CallRequestPopup";
import {useUnit} from "effector-react";
import {toggleCallRequestOpenEvent} from "@/components/organisms/popups/call-request/model";

const TextNavbar = () => {

    const router = useRouter()
    const togglePopupState = useUnit(toggleCallRequestOpenEvent)

    const items: (TextLink | TextAction)[] = [
        {text: 'Главная', link: '/'},
        {text: 'Акции', link: '/sales'},
        {text: 'Услуги', link: '/services'},
        {text: 'О компании', link: '/about-company'},
        {text: 'Контакты', link: '/contacts'},
        {text: 'Заказать звонок', action: togglePopupState},
    ]

    const linkCV: ClassValue = "hover:text-link-blue hoverable pointer"

    return (
        <React.Fragment>
            <CallRequestPopup/>
            <section className={"flex flex-row item-baseline gap-10"}>
                {
                    items.map((item, index) => {
                        return index !== items.length - 1 ?
                            <Text
                                text={item.text}
                                className={linkCV}
                                onClick={() => router.push((item as TextLink).link as string)}
                                key={index}
                            /> :
                            <TextButton
                                text={item.text}
                                onClick={(item as TextAction).action}
                                key={index}
                            />
                    })
                }
            </section>
        </React.Fragment>
    )
}

export default TextNavbar
