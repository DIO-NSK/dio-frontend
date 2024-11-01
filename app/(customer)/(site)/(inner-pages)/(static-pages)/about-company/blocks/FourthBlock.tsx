import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import AdvantageCard from "@/components/organisms/cards/advantage-card/AdvantageCard";
import { IconHeaderCard } from "@/types/cards";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import { CrossIcon, DropletIcon, WavesIcon } from "lucide-react";

const FourthBlock = () => {

    const cardData: IconHeaderCard[] = [
        { icon: <WavesIcon size={28} />, header: "Поддерживает водно-солевой баланс минеральных и органических веществ" },
        { icon: <DropletIcon size={28} />, header: "При кипячении не теряет своих свойств, так как не оставляет накипи" },
        { icon: <CrossIcon size={28} />, header: "Оптимальная для сибиряков. Обогащена кальцием, магнием и калием" },
    ]

    const wrapperCV: ClassValue[] = [
        "sm:grid sm:grid-cols-12 sm:gap-x-5 sm:gap-y-10 sm:pb-[50px] border-b-2 border-light-gray",
        "md:px-[24px] lg:px-0 sm:px-0 xl:px-0 lg:max-w-[964px] xl:max-w-[1260px]",
        "hidden py-5 md:-ml-[24px] lg:-ml-0 sm:w-full sm:pt-[50px] w-full",
    ]

    const cardWrapperCV = [
        "hover:border-blue-200 w-full sm:col-span-4 xl:col-span-4 bg-white",
        "border-2 border-white hover:bg-bg-light-blue",
    ]

    return (
        <div className={"w-full sm:col-span-full lg:h-[325px] xl:h-[281px]"}>
            <div className='w-full lg:absolute lg:left-0 flex flex-col items-center bg-light-gray'>
                <div className={cn(wrapperCV)}>
                    {
                        cardData.map((item) => <AdvantageCard
                            classNames={{
                                wrapper: cn(cardWrapperCV),
                                text: "font-medium"
                            }}
                            card={item}
                        />)
                    }
                </div>
            </div>
            <MobileHeaderWrapper classNames={{
                mainWrapper: "bg-light-gray pb-5",
                contentWrapper: "flex flex-row gap-3 w-full"
            }}>
                {
                    cardData.map((item) => <AdvantageCard
                        classNames={{ wrapper: cn(cardWrapperCV), text: "font-medium" }}
                        card={item}
                    />)
                }
            </MobileHeaderWrapper>
        </div>
    )

}

export default FourthBlock;
