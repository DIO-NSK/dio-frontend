import React from 'react';
import TextLg from "@/components/atoms/text/text-lg/TextLg";
import TextM from "@/components/atoms/text/text-m/TextM";

const CardBulletCol = ({header, items}: {
    header: string,
    items: string[]
}) => {
    return (
        <div className={"col-span-9 flex flex-col gap-[20px]"}>
            <TextLg text={header} weight={"semibold"}/>
            <div className={"w-full flex flex-col gap-[15px]"}>
                {
                    items.map((item, index) => {
                        return <div className={"flex flex-row items-baseline gap-[15px]"}>
                            <TextM text={"0" + (index + 1).toString()} weight={"semibold"}/>
                            <TextM text={item} weight={"medium"}/>
                        </div>
                    })
                }
            </div>
        </div>
    )
};

export default CardBulletCol;
