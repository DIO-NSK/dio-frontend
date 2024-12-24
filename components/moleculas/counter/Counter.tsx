import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CounterProps } from "./Counter.types";

const Counter = (props: CounterProps) => {
  const controlCV: ClassValue = "text-border-gray hoverable pointer hover:text-link-blue";
  const minusCV: ClassValue[] = [controlCV, { "hover:text-text-gray": props.amount == 1 }];

  return (
    <div className={"flex flex-row items-center"}>
      <FiMinus size={"22px"} className={cn(minusCV)} onClick={props.decrease} />
      <Text text={`${props.amount}`} className={"w-[50px] flex justify-center text-lg text-text-gray"} />
      <FiPlus size={"22px"} className={cn(controlCV)} onClick={props.increase} />
    </div>
  );
};

export default Counter;
