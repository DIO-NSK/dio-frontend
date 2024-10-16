import InfoCircleIcon from "@/components/atoms/svg/info-circle-icon/InfoCircleIcon";
import Text from "@/components/atoms/text/text-base/Text";
import { cn } from "@/utlis/cn";

const FirstBlock = () => {

    const wrapperCV = [
        "mx-5 sm:mx-0 col-span-full flex flex-col sm:grid sm:grid-cols-12 gap-5",
        "md:pb-10 xl:pb-[50px] sm:border-b-2 border-light-gray"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <div className={"w-full sm:col-span-6 flex flex-col gap-[20px]"}>
                <Text
                    text={"Вода из Сибири для сибиряков"}
                    className={"text-[22px] leading-tight md:text-[28px] xl:text-[32px] font-semibold text-link-blue"}
                />
                <Text
                    className={"text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] xl:pb-5 border-b-2 border-light-gray sm:border-0"}
                    text={"С 2001 года мы занимаемся производством, розливом\n" +
                        "и доставкой артезианской питьевой воды в Новосибирске"}
                />
                <Text
                    className={"text-[16px] xl:text-[18px] xl:pb-5 border-b-2 border-light-gray sm:border-0 sm:text-text-gray"}
                    text={"Главный принцип производства питьевой воды «DIO»  — сохранение\n" +
                        "природного микроэлементного состава артезианской воды"}
                />
            </div>
            <div className={"w-full sm:col-start-8 sm:col-span-5 flex flex-col md:gap-4 xl:gap-5"}>
                <div className={"hidden sm:flex"}><InfoCircleIcon /></div>
                <Text
                    className={"text-[16px] xl:text-[18px] xl:pb-5 border-b-2 border-light-gray sm:border-0"}
                    text={"Артезианская вода «DIO» производится на полностью автоматической" +
                        " линии производства, проходит постоянный контроль качества. Каждые 30" +
                        " минут вода исследуется сотрудниками лаборатории, каждая партия воды" +
                        " проверяется региональным центром Роспотребнадзора РФ"}
                />
            </div>
        </div>
    )
}

export default FirstBlock;
