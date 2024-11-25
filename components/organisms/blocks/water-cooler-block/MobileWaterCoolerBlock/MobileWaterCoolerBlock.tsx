import Text from "@/components/atoms/Text/Text";
import { Image } from "@chakra-ui/react";
import { IconButton } from "../IconButton/IconButton";
import { IconButtonProps } from "../IconButton/IconButton.types";

const data: IconButtonProps[] = [
  {
    activeUrl: "/icons/cooler-icons/atom-icon-active.png",
    defaultActive: true,
    inactiveUrl: "/icons/cooler-icons/atom-icon-inactive.png",
    header: "Собственное производство",
    offset: { top: 100, centerRight: 125 },
    description: (
      <Text className="text-sm text-black">
        Уделяем особое внимание инновациям <br /> и используем только передовое оборудование
      </Text>
    ),
  },
  {
    activeUrl: "/icons/cooler-icons/virus-icon-active.png",
    inactiveUrl: "/icons/cooler-icons/virus-icon-inactive.png",
    header: "Доставка без выходных",
    offset: { top: 300, centerRight: 150 },
    description: (
      <Text className="text-sm text-black">
        Надежное обслуживание <br /> для вашего комфорта
      </Text>
    ),
  },
  {
    activeUrl: "/icons/cooler-icons/leaf-icon-active.png",
    inactiveUrl: "/icons/cooler-icons/leaf-icon-inactive.png",
    header: "Натуральный состав",
    offset: { top: 100, centerLeft: 55 },
    description: (
      <Text className="text-sm text-black">
        Три артезианские скважины <br /> расположены в лесной зоне <br /> Академгородка
      </Text>
    ),
  },
  {
    activeUrl: "/icons/cooler-icons/droplet-icon-active.png",
    inactiveUrl: "/icons/cooler-icons/droplet-icon-inactive.png",
    header: "Многолетний опыт работы",
    offset: { top: 300, centerLeft: 80 },
    description: (
      <Text className="text-sm text-black">
        Обеспечиваем качество <br /> и надежность нашей продукции <br /> с 2001 года
      </Text>
    ),
  },
];

export const MobileWaterCoolerBlock = () => (
  <section className="w-full relative">
    {data.map((item, index) => (
      <IconButton {...item} key={index} />
    ))}
    <Image
      className="ml-3 h-[400px] w-full object-scale-down"
      alt="Мобильное изображение кулера"
      src="/images/water-cooler.png"
    />
  </section>
);
