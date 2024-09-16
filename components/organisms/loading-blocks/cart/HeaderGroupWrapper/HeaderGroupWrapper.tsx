import Text from "@/components/atoms/text/text-base/Text";
import React, {ReactNode} from "react";
import {GroupWrapper} from "@/components/organisms/loading-blocks/cart/GroupWrapper/GroupWrapper";

interface HeaderGroupWrapperProps {
    amount?: number;
    children: ReactNode;
    header : string;
}

export const HeaderGroupWrapper = ({header, amount, children}: HeaderGroupWrapperProps) => (
    <section className={"w-full flex flex-col gap-5 xl:gap-7"}>
        <div className={"w-full flex flex-row items-baseline gap-3"}>
            <Text text={header} className={"font-medium sm:text-xl text-lg"}/>
            <Text
                className={"text-sm sm:text-base text-text-gray"}
                text={`Всего ${amount} шт.`}
            />
        </div>
        <GroupWrapper>
            {children}
        </GroupWrapper>
    </section>
);