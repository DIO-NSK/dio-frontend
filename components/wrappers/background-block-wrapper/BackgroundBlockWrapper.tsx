import Text from "@/components/atoms/Text/Text";
import { Theme } from "@/types/props/Theme";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import React from "react";

type BackgroundBlockWrapperProps = {
  children: React.ReactNode;
  header?: string;
  rightContent?: React.ReactNode;
  className?: string;
  theme?: Theme;
};

const BackgroundBlockWrapper = ({ theme = "filled", ...props }: BackgroundBlockWrapperProps) => {
  const wrapperCV: ClassValue[] = [
    "w-full md:bg-bg-light-blue md:border-2 md:border-light-gray",
    "flex flex-col gap-3 md:gap-5 md:grid md:grid-cols-2 md:p-5 xl:p-7 md:rounded-xl",
    { "md:bg-white md:border-2 md:border-light-gray": theme == "outlined" },
  ];

  return (
    <div className={cn("w-full flex flex-col gap-4", props.className)}>
      <div className={"w-full flex flex-row items-center justify-between"}>
        {props.header && <Text text={props.header} className={"text-lg font-medium"} />}
        {props.rightContent}
      </div>
      <div className={cn(wrapperCV)}>{props.children}</div>
    </div>
  );
};

export default BackgroundBlockWrapper;
