import React from 'react';
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import {HeaderDescription} from "@/types/dto/text";
import {ClassValue} from "clsx";

const UserInfoCard = () => {

    const userInfoData: HeaderDescription[] = [
        {header: "ФИО", description: "Третьяков Артём Александрович"},
        {header: "Номер телефона", description: "+7 (913) 939-11-94"}
    ]

    return (
        <BackgroundBlockWrapper
            header={"Основная информация"}
            theme={"outlined"}
        >
            {
                userInfoData.map((row, key) => {

                    const rowCV : ClassValue[] = [
                        "col-span-full flex flex-row items-baseline justify-between",
                        {"border-b-2 border-light-gray pb-5" : key != userInfoData.length - 1}
                    ]

                    return <div key={key} className={cn(rowCV)}>
                        <Text text={row.header} className={"text-base text-text-gray"}/>
                        <Text text={row.description} className={"text-base"}/>
                    </div>

                })
            }
        </BackgroundBlockWrapper>
    );

};

export default UserInfoCard;
