import React from 'react';
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import Link from "next/link";
import Text from "@/components/atoms/text/text-base/Text";

const MobileCatalogSearchingMenu = () => {
    return (
        <section className={"flex flex-col gap-7"}>
            <HeaderRow
                theme={"bordered"}
                header={"Товары"}
                leftContent={"3 шт."}
                rightContent={
                    <Link href={"/catalog/1"}>
                        <Text
                            className={"text-[14px] text-link-blue"}
                            text={"Смотреть все"}
                        />
                    </Link>
                }
            />
            <HeaderRow
                theme={"bordered"}
                header={"Услуги"}
                leftContent={"2 шт."}
            />
        </section>
    );
};

export default MobileCatalogSearchingMenu;
