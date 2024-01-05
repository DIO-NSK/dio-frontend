"use client"

import TextBase from "@/components/atoms/text/text-base/TextBase";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {ClassValue} from "clsx";
import {TextAction, TextLink} from "@/types/dto/text";
import {useRouter} from "next/navigation";

const TextNavbar = () => {

    const router = useRouter()

    const items: (TextLink | TextAction)[] = [
        {text: 'Акции', link: '/sales'},
        {text: 'Услуги', link: '/services'},
        {text: 'О компании', link: '/about-company'},
        {text: 'Контакты', link: '/contacts'},
        {text: 'Заказать звонок', action: () => console.log("ACTION")},
    ]

    const linkCV: ClassValue = "hover:text-link-blue hoverable pointer"

    return (
        <div className={"flex flex-row item-baseline gap-10"}>
            {
                items.map((item, index) => {
                    return index !== items.length - 1 ?
                        <TextBase
                            text={item.text}
                            className={linkCV}
                            onClick={() => router.push((item as TextLink).link)}
                        /> :
                        <TextButton
                            text={item.text}
                            onClick={(item as TextAction).action}
                        />
                })
            }
        </div>
    )
}

export default TextNavbar
