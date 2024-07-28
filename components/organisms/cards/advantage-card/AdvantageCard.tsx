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
    "sm:col-span-3 col-span-1 sm:p-[30px] p-6 rounded-xl bg-bg-light-blue flex",
    "hover:bg-transparent border-2 border-light-gray group",
    "flex-col gap-3 sm:gap-[15px] hoverable pointer", className
]

const textStyles = (className ?: string): ClassValue => [
    "group-hover:text-link-blue text-black sm:leading-none",
    "sm:text-lg text-[14px] font-medium", className
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
