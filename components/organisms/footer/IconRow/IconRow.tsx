import Link from "next/link";
import React from "react";
import {iconData} from "./IconRow.constants";
import {PropsWithClassName} from "@/types/props/utils/PropsWithClassName";
import {cn} from "@/utlis/cn";

export const IconRow = ({className} : PropsWithClassName<any>) => (
    <div className={cn("flex flex-row items-center gap-[15px]", className)}>
        {iconData.map((iconButton, key) =>
            <Link href={iconButton.href} target={"_blank"} rel={"noopener noreferer"} key={key}>
                <img
                    src={iconButton.src}
                    alt={"Социальная сеть"}
                    className={"size-6"}
                />
            </Link>
        )}
    </div>
)