import { waterCoolerBlockData } from "@/data/waterCoolerBlockData";
import { Image } from "@chakra-ui/react";
import { DescriptionColumn } from "../DescriptionColumn/DescriptionColumn";

const COOLER_SRC = "https://storage.yandexcloud.net/dio-static-images/DIO_Water_Cooler.png";
const size = { width: 600, height: 700 };

export const DesktopWaterCoolerBlock = () => (
  <section className={"flex md:hidden xl:flex relative w-full flex-col items-center"}>
    <section className="hidden xl:flex">
      {waterCoolerBlockData.map((item, index) => {
        return <DescriptionColumn {...item} description={item.descr} key={index} />;
      })}
    </section>
    <Image className="-ml-10 object-scale-down" alt="Изображение кулера" src={COOLER_SRC} {...size} />
  </section>
);
