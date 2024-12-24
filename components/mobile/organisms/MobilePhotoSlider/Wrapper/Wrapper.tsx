import Chip from "@/components/atoms/chip/Chip";
import Text from "@/components/atoms/Text/Text";
import { IfRenderBlock } from "@/components/wrappers/IfRenderBlock/IfRenderBlock";
import { cn } from "@/utlis/cn";
import { chakra } from "@chakra-ui/react";
import { Children } from "react";
import Slider from "react-slick";
import { config } from "./Wrapper.config";
import { MobilePhotoSliderWrapperProps } from "./Wrapper.types";

const Section = chakra.section;

export const Wrapper = ({
  showQuantity,
  activeIndex,
  className,
  children,
  onChange,
}: MobilePhotoSliderWrapperProps) => {
  const settings = {
    infinite: Children.count(children) > 1,
    beforeChange: (_: number, next: number) => onChange(next),
    appendDots: (dots: any) => (
      <div>
        <ul className={"w-full flex items-center gap-5 justify-center"}> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => {
      const stepColor = activeIndex === i ? "bg-link-blue" : "bg-border-gray";

      return <span className={cn("mt-3 w-10 h-[3px]", stepColor)} />;
    },
  };

  return (
    <Section className={cn("md:hidden w-full overflow-hidden relative -mt-7 mb-7", className)}>
      <IfRenderBlock condition={Boolean(showQuantity)}>
        <Chip className="absolute top-5 right-5 bg-link-blue z-30">
          <Text className="text-white text-xs font-normal">
            {activeIndex + 1} / {Children.count(children)}
          </Text>
        </Chip>
      </IfRenderBlock>
      <Slider className="w-full" {...config} {...settings}>
        {children}
      </Slider>
    </Section>
  );
};
