import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";

const CardBulletCol = ({header, items}: {
    header: string,
    items: string[]
}) => {
    return (
        <div className={"w-full md:w-[calc(100vw-48px)] lg:w-full flex flex-col gap-3 md:gap-5"}>
            <Text text={header} className={"text-lg md:text-[20px] font-semibold"}/>
            <div className={"w-full flex flex-col gap-2"}>
                {
                    items.map((item, index) => {
                        return <div className={"flex flex-row items-baseline gap-[15px]"}>
                            <Text text={"0" + (index + 1).toString()} className={"text-base text-link-blue"}/>
                            <Text text={item} className={"text-base"}/>
                        </div>
                    })
                }
            </div>
        </div>
    )
};

export default CardBulletCol;
