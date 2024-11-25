"use client";

import Text from "@/components/atoms/Text/Text";
import { TextLink } from "@/types/dto/text";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import { useRouter } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

const BreadCrumbs = ({ breadcrumbs, className }: { className?: string; breadcrumbs: TextLink[] }) => {
  const router = useRouter();

  const textCV: ClassValue[] = [
    "text-[14px] sm:text-base whitespace-nowrap text-text-gray",
    "hover:text-link-blue hoverable pointer",
  ];

  return (
    <div className={cn("flex flex-row items-center gap-[5px]", className)}>
      {breadcrumbs.map((item, index) => {
        return (
          <div className={"flex flex-row items-center gap-[5px]"}>
            <Text text={item.text} className={cn(textCV)} onClick={() => router.push(item.link as string)} />
            {index !== breadcrumbs.length - 1 && <FiChevronRight size={"18px"} className={"stroke-text-gray"} />}
          </div>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
