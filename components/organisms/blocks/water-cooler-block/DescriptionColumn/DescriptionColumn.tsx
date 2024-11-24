import { DescriptionColumnProps } from "./DescriptionColumn.types";

export const DescriptionColumn = ({ header, description, top, left, right }: DescriptionColumnProps) => (
  <div
    className={"absolute w-[350px] flex flex-col gap-[10px] xl:gap-[15px]"}
    style={{ top: top, left: left, right: right }}
  >
    <h3 className={"text-base xl:text-[22px] font-semibold"}>{header}</h3>
    <p className={"text-sm xl:text-[18px]"}>{description}</p>
  </div>
);
