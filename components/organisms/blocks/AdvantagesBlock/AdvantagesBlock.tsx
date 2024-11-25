import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import { AdvantageCard } from "@/components/organisms/cards";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import { data } from "./AdvantagesBlock.constants";

export const AdvantagesBlock = () => (
  <>
    <section className={"w-full hidden md:flex mb-5 xl:mb-0"}>
      <HeaderGroup header={"Наши преимущества"}>
        {data.map((card) => {
          return <AdvantageCard card={card} />;
        })}
      </HeaderGroup>
    </section>
    <MobileHeaderWrapper header={"Наши преимущества"}>
      {data.map((card) => {
        return <AdvantageCard card={card} />;
      })}
    </MobileHeaderWrapper>
  </>
);
