import Text from "@/components/atoms/Text/Text";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import { cn } from "@/utlis/cn";
import { DataBlockProps } from "./DataBlock.types";

export const DataBlock = ({ header, items, className }: DataBlockProps) => (
  <BackgroundBlockWrapper header={header}>
    {items.map((item, index) => (
      <section
        className={cn(
          "col-span-1 border-b-2 border-light-gray pb-5 flex flex-row items-baseline justify-between",
          className,
        )}
        key={index}
      >
        <Text text={item.header} className={"text-text-gray"} />
        <Text text={item.description} />
      </section>
    ))}
  </BackgroundBlockWrapper>
);
