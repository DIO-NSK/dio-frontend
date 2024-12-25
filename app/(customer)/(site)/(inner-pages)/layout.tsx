import { ResponsiveContainer } from "@/components/wrappers";
import React from "react";

const InnerPagesLayout = ({ children }: { children: React.ReactNode }) => (
  <ResponsiveContainer className="mb-7">
    <div className={"w-full md:mt-[10px] md:grid md:grid-cols-12 md:gap-5 xl:gap-x-[30px] xl:gap-y-[30px]"}>
      {children}
    </div>
  </ResponsiveContainer>
);

export default InnerPagesLayout;
