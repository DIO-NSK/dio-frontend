import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import WaterCard from "@/components/organisms/cards/water-card/WaterCard";
import SliderGroup from "@/components/wrappers/SliderGroup/SliderGroup";
import { getOurWaters } from "../page.hooks";

export const OurWaters = async () => {
  const ourWaters = await getOurWaters();

  return (
    <>
      <section className={"w-full hidden md:flex"}>
        <SliderGroup header={"Наши воды"} outOfScreen={false} desktopSlidesPerView={4}>
          {ourWaters.map((waterCard, key) => (
            <WaterCard waterCard={waterCard} key={key} />
          ))}
        </SliderGroup>
      </section>
      <MobileHeaderWrapper header={"Наши воды"}>
        {ourWaters.map((waterCard, key) => {
          return <WaterCard waterCard={waterCard} key={key} />;
        })}
      </MobileHeaderWrapper>
    </>
  );
};
