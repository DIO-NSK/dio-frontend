import {IconHeaderCard} from "@/types/cards";
import {cn} from "@/utlis/cn";
import {ClassValue} from "clsx";

type AdvantageCardClassnames = {
    wrapper?: string,
    text?: string
}

type AdvantageCardProps = {
    card: IconHeaderCard,
    classNames?: AdvantageCardClassnames
}

const wrapperStyles = (className ?: string): ClassValue[] => [
    "md:col-span-4 xl:col-span-3 col-span-1 p-6 xl:p-[30px] rounded-xl bg-bg-light-blue flex",
    "hover:bg-transparent border-2 border-light-gray group",
    "flex-col gap-3 md:gap-[15px] hoverable pointer", className
]

const textStyles = (className ?: string): ClassValue => [
    "group-hover:text-link-blue text-black md:leading-none",
    "md:text-lg text-[14px] font-medium", className
]

const iconWrapperStyles: ClassValue[] = [
    "text-link-blue group-hover:bg-blue-100",
    "w-fit p-2 rounded-lg hoverable"
]

const AdvantageCard = ({card, classNames}: AdvantageCardProps) => (
    <section className={cn(wrapperStyles(classNames?.wrapper))}>
        <div className={cn(iconWrapperStyles)}>
            {card.icon}
        </div>
        <h4 className={cn(textStyles(classNames?.text))}>{card.header}</h4>
    </section>
)

export default AdvantageCard
