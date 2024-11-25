import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import React from "react";

const HeaderBlock = ({
  header,
  children,
  className,
}: {
  header: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full col-span-9 flex flex-col px-5 sm:px-0 gap-3 sm:gap-5", className)}>
      <Text text={header} className={"text-[20px] xl:text-[24px] font-semibold"} />
      {children}
    </div>
  );
};

export default HeaderBlock;
