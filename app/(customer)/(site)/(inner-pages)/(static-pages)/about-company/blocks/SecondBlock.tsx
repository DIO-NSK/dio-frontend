import React from 'react';
import {cn} from "@/utlis/cn";
import Text from "@/components/atoms/text/text-base/Text";

const SecondBlock = () => {

    const wrapperCV = [
        "mx-5 sm:mx-0 flex flex-col col-span-full sm:grid sm:grid-cols-12",
        "gap-5 pb-5 md:pb-10 xl:pb-[50px] border-b-2 border-light-gray"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <Text
                text={"Дар природы с глубины 130 метров"}
                className={"w-full text-[22px] sm:col-span-6 md:text-[28px] sm:text-[32px] font-semibold text-link-blue"}
            />
            <Text
                className={"w-full text-[16px] sm:col-start-8 sm:col-span-5 xl:text-[18px] text-black"}
                text={"Три артезианские скважины расположены на территории производства DIOGEN" +
                    "(«Диоген») в лесной зоне Академгородка и относятся к магниево-кальциевым " +
                    "гидрокарбонатным источникам, содержащим важные для организма вещества."}
            />
        </div>
    )
}

export default SecondBlock;
