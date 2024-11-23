import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import ServiceCard from "@/components/organisms/cards/service-card/ServiceCard";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import { data } from "./Services.data";

export const Services = () => (
  <>
    <HeaderGroup header={"Попробуйте наши услуги"} className="hidden md:flex">
      {data.map((item, key) => (
        <ServiceCard item={item} key={key} />
      ))}
    </HeaderGroup>
    <MobileHeaderWrapper
      classNames={{ contentWrapper: "md:hidden w-full pr-5 grid grid-cols-2 gap-3 mb-7" }}
      header={"Попробуйте наши услуги"}
      canSlide={false}
    >
      {data.map((item, key) => (
        <ServiceCard item={item} key={key} />
      ))}
    </MobileHeaderWrapper>
  </>
);
