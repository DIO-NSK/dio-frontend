import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";

const CardBulletCol = ({header, items}: {
    header: string,
    items: string[]
}) => {
    return (
        <div className={"col-span-9 flex flex-col gap-[20px]"}>
            <Text text={header} className={"text-[20px] font-semibold"}/>
            <div className={"w-full flex flex-col gap-[15px]"}>
                {
                    items.map((item, index) => {
                        return <div className={"flex flex-row items-baseline gap-[15px]"}>
                            <Text text={"0" + (index + 1).toString()} className={"text-lg font-medium"}/>
                            <Text text={item} className={"text-lg font-medium"}/>
                        </div>
                    })
                }
            </div>
        </div>
    )
};

export default CardBulletCol;
