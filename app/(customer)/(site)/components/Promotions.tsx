import MobileHeaderWrapper from "@/components/mobile/wrappers/mobile-header-wrapper/MobileHeaderWrapper";
import SaleCard from "@/components/organisms/cards/sale-card/SaleCard";
import SliderGroup from "@/components/wrappers/SliderGroup/SliderGroup";
import { getPromotions } from "../page.hooks";

const SLIDES_PER_VIEW = 4.1;
const CONTAINER_HEIGHT = 200;

export const Promotions = async () => {
  const promotions = await getPromotions();

  return (
    <>
      <section className={"w-full hidden md:flex"}>
        <SliderGroup
          desktopSlidesPerView={SLIDES_PER_VIEW}
          containerHeight={CONTAINER_HEIGHT}
          header={"Акции и предложения"}
          href={"/sales"}
        >
          {promotions.map((promotion, key) => (
            <SaleCard promotion={promotion} key={key} />
          ))}
        </SliderGroup>
      </section>
      <MobileHeaderWrapper
        classNames={{ contentWrapper: "w-full pr-5 flex flex-col gap-3" }}
        textLink={{ text: "Смотреть все", link: "/sales" }}
        header={"Акции и предложения"}
      >
        {promotions.map((promotion, key) => (
          <SaleCard promotion={promotion} key={key} />
        ))}
      </MobileHeaderWrapper>
    </>
  );
};
