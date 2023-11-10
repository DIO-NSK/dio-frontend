
import TextBase from "@/components/atoms/text/text-base/TextBase";
import Link from "next/link";
import TextButton from "@/components/atoms/buttons/text-button/TextButton";

const TextNavbar = () => {

    const items = [
        {
            name: 'Акции',
            path: '/sales'
        },
        {
            name: 'Услуги',
            path: '/services'
        },
        {
            name: 'О компании',
            path: '/about'
        },
        {
            name: 'Контакты',
            path: '/contacts'
        },
        {
            name: 'Заказать звонок'
        },
    ]

    return (
        <div className={"flex flex-row item-baseline gap-10"}>
            {
                items.map((item) => {
                    return item.path ? <Link
                        href={item.path}
                        children={<TextBase text={item.name}/>}
                    /> : <TextButton
                        text={item.name}
                        onClick={() => console.log("MAKE CALL")}
                    />
                })
            }
        </div>
    )
}

export default TextNavbar
