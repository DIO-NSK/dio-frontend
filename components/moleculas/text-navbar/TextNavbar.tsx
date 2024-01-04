import TextBase from "@/components/atoms/text/text-base/TextBase";
import Link from "next/link";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";
import {ClassValue} from "clsx";
import {TextAction, TextLink} from "@/types/dto/text";

const TextNavbar = () => {

    const items: (TextLink | TextAction)[] = [
        {text: 'Акции', link: '/sales'},
        {text: 'Услуги', link: '/services'},
        {text: 'О компании', link: '/about'},
        {text: 'Контакты', link: '/contacts'},
        {text: 'Заказать звонок', action: () => console.log("ACTION")},
    ]

    const linkCV : ClassValue = "hover:text-link-blue hover:duration-200 transition"

    return (
        <div className={"flex flex-row item-baseline gap-10"}>
            {
                items.map((item, index) => {
                    return index !== items.length - 1 ?
                        <Link
                            href={(item as TextLink).link}
                            children={
                                <TextBase
                                    text={item.text}
                                    className={linkCV}
                                />
                            }
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
