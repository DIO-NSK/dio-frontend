import SlideButton from "@/components/atoms/buttons/slide-button/SlideButton";
import Text from "@/components/atoms/Text/Text";
import { DESKTOP_SLIDES_PER_VIEW } from "@/constants/swiper";
import { Side } from "@/data/enums/side";
import { cn } from "@/utlis/cn";
import Link from "next/link";
import React, { forwardRef, useEffect, useState } from "react";
import { SliderHeaderProps } from "./SliderHeader.types";
import { createHeaderStyle } from "./SliderHeader.utils";

export const SliderHeader = forwardRef(
  (
    { desktopSlidesPerView = DESKTOP_SLIDES_PER_VIEW, children, headerSize, header, hasLoop, href }: SliderHeaderProps,
    ref,
  ) => {
    const isInitEnd = React.Children.count(children) <= desktopSlidesPerView;
    const [isEnd, setEnd] = useState<boolean>(isInitEnd);
    const [isBegin, setBegin] = useState<boolean>(true);

    useEffect(() => {
      if ((ref as any).current) {
        (ref as any).current.on("slideChange", (swipe: any) => {
          setBegin(Boolean(swipe.isBeginning));
          setEnd(Boolean(swipe.isEnd));
        });
      }
    }, [(ref as any).current]);

    return (
      <span className={"w-full px-5 md:px-0 xl:px-0 col-span-full flex flex-row justify-between items-center"}>
        <span className={"flex flex-row items-baseline gap-5"}>
          {header ? (
            <h2 className={cn("text-[20px] font-bold leading-none", createHeaderStyle(headerSize))}>{header}</h2>
          ) : null}
          {href ? (
            <Link href={href}>
              <Text className={"hidden sm:flex md:text-base xl:text-[18px] text-link-blue"} text={"Перейти"} />
            </Link>
          ) : null}
        </span>
        <span className={"hidden md:flex flex-row items-center md:gap-2 lg:gap-4"}>
          <SlideButton onClick={() => (ref as any).current?.slidePrev()} disabled={!hasLoop} side={Side.LEFT} />
          <SlideButton onClick={() => (ref as any).current?.slideNext()} side={Side.RIGHT} disabled={!hasLoop} />
        </span>
      </span>
    );
  },
);
