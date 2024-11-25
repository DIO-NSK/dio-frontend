import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import React from "react";

type HeaderDescrButtonRowProps = {
  header: string;
  descr: string;
  button?: React.ReactNode;
  className?: string;
};

const HeaderDescriptionButtonRow = (props: HeaderDescrButtonRowProps) => {
  return (
    <div className={cn("w-full flex flex-row items-end justify-between", props.className)}>
      <div className={"flex flex-col gap-2 w-[750px]"}>
        <Text text={props.header} className={"text-[20px] font-medium"} />
        <Text text={props.descr} className={"text-text-gray"} />
      </div>
      {props.button}
    </div>
  );
};

export default HeaderDescriptionButtonRow;
