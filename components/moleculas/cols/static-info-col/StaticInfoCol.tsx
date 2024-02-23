import React from 'react';
import {InformationBlock} from "@/types/dto/text";
import Text from "@/components/atoms/text/text-base/Text";

const StaticInfoCol = ({data} : {
    data : InformationBlock[]
}) => {
    return (
        <div className={"col-span-full flex flex-col gap-7 sm:gap-[40px]"}>
            {
                data.map((block) => (
                    <div className={"w-full flex flex-col gap-6 sm:gap-7"}>
                        {
                            block.blockHeader && <Text
                                text={block.blockHeader}
                                className={"text-xl sm:text-[24px] text-black font-semibold"}
                            />
                        }
                        {
                            block.blockContent.map((item) => (
                                <div
                                    className={"w-full flex flex-col gap-[20px] pb-[30px] border-b-2 border-light-gray"}>
                                    {
                                        item.itemHeader && <Text
                                            text={item.itemHeader}
                                            className={"text-[18px] font-medium"}
                                        />
                                    }
                                    <div className={"w-full flex flex-col gap-[15px]"}>
                                        {
                                            item.itemContent.map((text) => (
                                                <Text text={text} className={"text-base text-black"}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
};

export default StaticInfoCol;
