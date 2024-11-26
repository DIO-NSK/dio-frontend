import { ClassValue } from "clsx";

const wrapperStyles = (className?: string): ClassValue[] => [
  "col-span-1 md:col-span-4 xl:col-span-3 p-[15px] md:p-6 xl:p-[30px] rounded-xl bg-bg-light-blue flex",
  "hover:bg-transparent border-2 border-light-gray group flex-col gap-3 md:gap-[15px]",
  "hoverable pointer w-fit md:w-full",
  className,
];

const textStyles = (className?: string): ClassValue => [
  "group-hover:text-link-blue text-black md:leading-none",
  "md:text-lg text-[14px] font-medium",
  className,
];

const iconWrapperStyles: ClassValue[] = ["text-link-blue group-hover:bg-blue-100", "w-fit p-2 rounded-lg hoverable"];

export { iconWrapperStyles, textStyles, wrapperStyles };
