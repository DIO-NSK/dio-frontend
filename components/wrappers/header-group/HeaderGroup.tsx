import {HeaderLinkWrapperType} from "@/types/wrappers";

import Link from "next/link";

const HeaderGroup = ({header, children, textLink = null}: HeaderLinkWrapperType) => (
    <article className={"w-full px-5 sm:mx-0 sm:col-span-full flex flex-col gap-5 sm:gap-7"}>
        <span className={"w-full flex flex-row justify-between items-baseline"}>
            <h2 className={"sm:text-[32px] text-[20px] w-full font-semibold"}>{header}</h2>
            {textLink && <Link href={textLink.path} className={"sm:text-[20px] text-link-blue text-[14px]"}>
                {textLink.text}
            </Link>}
        </span>
        <section className={"w-full flex flex-col gap-3 sm:grid-cols-12 sm:grid sm:gap-5"}>
            {children}
        </section>
    </article>
)

export default HeaderGroup
