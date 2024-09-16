"use client";

import Text from "@/components/atoms/text/text-base/Text";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {ClassValue} from "clsx";
import {TextAction, TextLink} from "@/types/dto/text";
import React from "react";
import CallRequestPopup from "@/components/organisms/popups/call-request/CallRequestPopup";
import {useUnit} from "effector-react";
import {toggleCallRequestOpenEvent} from "@/components/organisms/popups/call-request/model";
import Link from "next/link";
import {cn} from "@/utlis/cn";
import {useMediaQuery} from "usehooks-ts";

type TextNavbarItem = (TextLink | TextAction) & {
    isVisible?: boolean;
}

const TextNavbar = () => {

    const isLaptop = useMediaQuery('(min-width: 1440px)');
    const togglePopupState = useUnit(toggleCallRequestOpenEvent)

    const items: TextNavbarItem[] = [
        {text: 'Главная', link: '/'},
        {text: 'Акции', link: '/sales'},
        {text: 'Наши воды', link: '/our-waters?brand=DIO'},
        {text: 'Услуги', link: '/services',},
        {text: 'О компании', link: '/about-company'},
        {text: 'Контакты', link: '/contacts', isVisible: isLaptop},
        {text: 'Заказать звонок', action: togglePopupState},
    ]

    const linkCV: ClassValue = "hover:text-link-blue hoverable pointer text-sm xl:text-base whitespace-nowrap"

    return (
        <React.Fragment>
            <CallRequestPopup/>
            <section className={"flex flex-row item-baseline gap-5 xl:gap-10"}>
                {items.map((item, index) => {
                    return index !== items.length - 1 ? (
                        item.isVisible === false ? null :
                            <Link href={(item as TextLink).link as string} key={index}>
                                <Text text={item.text} className={linkCV}/>
                            </Link>
                    ) : <TextButton
                        text={item.text}
                        onClick={(item as TextAction).action}
                        key={index}
                    />
                })}
            </section>
        </React.Fragment>
    )
}

export default TextNavbar
