import {HeaderLinkWrapperType} from "@/types/wrappers";

import Link from "next/link";

const HeaderGroup = ({header, children, textLink = null}: HeaderLinkWrapperType) => (
    <article className={"w-full px-5 md:px-0 sm:col-span-full flex flex-col gap-5 xl:gap-7"}>
        <span className={"w-full flex flex-row justify-between items-baseline"}>
            <h2 className={"md:text-[28px] xl:text-[32px] text-[20px] w-full font-semibold"}>{header}</h2>
            {textLink && <Link href={textLink.path} className={"md:text-base xl:text-[20px] text-link-blue text-[14px]"}>
                {textLink.text}
            </Link>}
        </span>
        <section className={"w-full flex flex-col gap-3 md:grid-cols-12 md:grid md:gap-5"}>
            {children}
        </section>
    </article>
)

export default HeaderGroup
