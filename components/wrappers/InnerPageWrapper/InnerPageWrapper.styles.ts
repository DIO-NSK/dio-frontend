import { InnerPageWrapperClassNames } from "./InnerPageWrapper.types";

export const createWrapperStyles = (classNames?: InnerPageWrapperClassNames) => [
  "w-full col-span-full md:grid md:pb-7 md:grid-cols-12",
  "md:px-[24px] md:gap-5 lg:px-0 xl:px-0 xl:gap-7",
  classNames?.desktopWrapper,
];
