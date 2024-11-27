import { ResponseOurWater } from "@/app/admin/promo/models/our_waters.model";
import OurWaterPageCard from "@/components/organisms/blocks/our-waters-page-block/OurWaterPageCard";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";

const OurWaterPageBlock = ({ ourWaters }: { ourWaters: ResponseOurWater[] }) => (
  <InnerPageWrapper classNames={{ mobileWrapper: "gap-4" }}>
    {ourWaters.map((ourWater, index) => (
      <OurWaterPageCard ourWater={ourWater} key={index} />
    ))}
  </InnerPageWrapper>
);

export default OurWaterPageBlock;
