import { ResponseOurWater } from "@/app/admin/promo/models/our_waters.model";
import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

type WaterCardType = {
  waterCard: ResponseOurWater;
  className?: string;
};

const linkStyles = (className?: string): ClassValue[] => [
  "sm:w-full sm:col-span-3 flex flex-col gap-3 sm:gap-5",
  "group cursor-pointer",
  className,
];

const cardStyles = [
  "flex items-center justify-center w-full h-[150px]",
  "lg:h-[196px] xl:h-[300px] rounded-xl bg-bg-light-blue",
];

const textStyles = ["text-base md:text-[18px] text-black pointer", "hoverable group-hover:text-link-blue"];

const WaterCard = ({ waterCard, className }: WaterCardType) => (
  <Link className={cn(linkStyles(className))} href={`/our-waters?brand=${waterCard.name}`}>
    <div className={cn(cardStyles)}>
      <img
        className={"p-3 sm:p-10 w-full h-full object-scale-down select-none"}
        src={waterCard.image}
        alt={waterCard.name}
      />
    </div>
    <span className={"flex flex-row gap-[10px] items-center"}>
      <Text className={cn(textStyles)} text={waterCard.name} />
      <FiChevronRight className={"stroke-link-blue h-[18px] w-[18px] md:h-6 md:w-6"} />
    </span>
  </Link>
);

export default WaterCard;
