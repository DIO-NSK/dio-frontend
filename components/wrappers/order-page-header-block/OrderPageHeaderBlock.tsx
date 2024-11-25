import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import Text from "@/components/atoms/Text/Text";
import { WrapperProps } from "@/types/props/Wrapper";
import { cn } from "@/utlis/cn";
import { useState } from "react";

const OrderPageHeaderBlock = ({ header, ...props }: WrapperProps & { header: string }) => {
  const [isExpanded, setExpanded] = useState<boolean>(true);
  const handleSwitchExpanded = () => setExpanded(!isExpanded);

  return (
    <div className={cn("px-7 w-full flex flex-col gap-5", props.className)}>
      <div className={"w-full flex flex-row items-center justify-between"}>
        <Text text={header} className={"text-[20px] font-medium"} />
        <ChevronButton setExpanded={handleSwitchExpanded} isExpanded={isExpanded} />
      </div>
      {isExpanded && props.children}
    </div>
  );
};

export default OrderPageHeaderBlock;
