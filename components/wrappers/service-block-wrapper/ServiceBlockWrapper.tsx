import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import React from "react";

const wrapperCV = [
  "w-full flex flex-col gap-5 md:grid grid-cols-6 gap-x-7",
  "md:gap-y-5 pb-5 border-b-2 border-light-gray",
];

interface ServiceBlockWrapperProps {
  header: string;
  children: React.ReactNode;
}

const ServiceBlockWrapper = ({ header, children }: ServiceBlockWrapperProps) => (
  <div className={cn(wrapperCV)}>
    <div className={"md:col-span-full w-full"}>
      <Text text={header} className={"text-[18px] font-medium"} />
    </div>
    {children}
  </div>
);

export default ServiceBlockWrapper;
