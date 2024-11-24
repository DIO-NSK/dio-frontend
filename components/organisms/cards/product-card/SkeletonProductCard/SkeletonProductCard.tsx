import { cn } from "@/utlis/cn";
import { Skeleton } from "primereact/skeleton";
import { wrapperCV } from "./SkeletonProductCard.styles";
import { ProductCardClassNames } from "./SkeletonProductCard.types";

import "primereact/resources/themes/lara-light-cyan/theme.css";

const SkeletonProductCard = ({ classNames }: { classNames?: ProductCardClassNames }) => (
  <section className={cn(wrapperCV(classNames))}>
    <Skeleton width="100%" height="150px" />
    <div className={"w-full flex flex-col gap-3 sm:gap-5"}>
      <div className={cn("w-full flex flex-col gap-2 min-h-[50px] sm:min-h-[85px]", classNames?.textWrapper)}>
        <Skeleton width={"50%"} height={"20px"} />
        <Skeleton width={"100%"} height={"50px"} />
      </div>
      <div className={"flex flex-row items-center gap-4 sm:gap-5"}>
        <Skeleton width={"100%"} height={"50px"} className={"rounded-xl"} />
        <Skeleton shape={"circle"} size={"2rem"} className={"flex-none"} />
      </div>
    </div>
  </section>
);

export default SkeletonProductCard;
