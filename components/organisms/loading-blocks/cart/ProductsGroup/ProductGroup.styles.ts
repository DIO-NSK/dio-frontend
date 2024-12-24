import { cn } from "@/utlis/cn";

export const createStyles = (condition: boolean) =>
  cn({
    "md:pb-5 md:border-b-2 md:border-light-gray xl:pb-0 xl:border-b-0": condition,
  });
