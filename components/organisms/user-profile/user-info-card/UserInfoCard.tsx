import React from 'react';
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import {HeaderDescription} from "@/types/dto/text";
import {ClassValue} from "clsx";
import {convertPhoneNumber} from "@/utlis/convertPhoneNumber";
import {ResponseUserCredentials} from "@/app/(customer)/model";

const UserInfoCard = ({userCredentials} : {userCredentials : ResponseUserCredentials}) => {

    const userInfoData: HeaderDescription[] = [
        {header: "Имя пользователя", description: userCredentials.fullName},
        {header: "Номер телефона", description: convertPhoneNumber(userCredentials.phoneNumber)}
    ]

    return (
        <BackgroundBlockWrapper theme={"outlined"}>
            {
                userInfoData.map((row, key) => {

                    const rowCV : ClassValue[] = [
                        "w-full sm:col-span-full flex flex-col gap-2 sm:flex-row items-baseline sm:justify-between",
                        {"border-b-2 border-light-gray pb-5" : key !== userInfoData.length - 1},
                        {"sm:border-0 sm:pb-0 pb-5 border-b-2 border-light-gray" : key === userInfoData.length - 1},
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
