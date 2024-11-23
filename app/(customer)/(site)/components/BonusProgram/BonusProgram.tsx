import BonusCard from "@/components/organisms/cards/bonus-card/BonusCard";
import HeaderGroup from "@/components/wrappers/header-group/HeaderGroup";
import { data } from "./BonusProgram.data";

export const BonusProgram = () => (
  <HeaderGroup textLink={{ text: "Подробнее", path: "/bonus-program" }} header={"Бонусная программа"}>
    {data.map((bonusCard, key) => (
      <BonusCard bonusCard={bonusCard} key={key} />
    ))}
  </HeaderGroup>
);
