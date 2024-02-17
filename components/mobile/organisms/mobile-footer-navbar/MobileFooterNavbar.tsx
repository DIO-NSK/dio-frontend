import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import {TextLink} from "@/types/dto/text";
import Link from "next/link";

const MobileFooterNavbar = () => {

    const blockData: TextLink[] = [
        {text: "О компании", link: "/about-company"},
        {text: "Контакты", link: "/contacts"},
        {text: "Доставка", link: "/payment"},
        {text: "Возврат и обмен товара", link: "/returning"},
        {text: "Рассрочка", link: "/installment-plan"},
        {text: "Политика конфиденциальности", link: "/policy"}
    ]

    return (
        <nav className={"w-full flex flex-col gap-5 py-5 border-y-2 border-light-gray"}>
            {
                blockData.map((textLink, key) =>
                    <Link href={textLink.link} key={key}>
                        <Text text={textLink.text} className={"text-text-gray"}/>
                    </Link>
                )
            }
        </nav>
    )

};

export default MobileFooterNavbar;
