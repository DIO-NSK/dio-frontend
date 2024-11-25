"use client";

import { ResponseShortSale } from "@/app/admin/sales/model";
import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import { ClassValue } from "clsx";
import Link from "next/link";
import LinesEllipsis from "react-lines-ellipsis";

const wrapperCV: ClassValue[] = [
  "w-full sm:col-span-6 bg-white p-5 rounded-xl flex flex-col lg:flex-row gap-5",
  "xl:hover:z-10 border-2 border-light-gray xl:hover:shadow-lg xl:hover:shadow-gray-200/50 xl:hover:scale-[1.01] xl:hoverable pointer",
];

const TopRow = ({ info, duration }: { info: string; duration: string }) => (
  <div className={"w-full flex flex-row gap-[10px] items-baseline"}>
    <Text text={info} className={"text-link-blue"} />
    <Text text={`до ${duration}`} className={"text-text-gray"} />
  </div>
);

const MainCol = ({ header, description }: { header: string; description: string }) => (
  <div className={"w-full flex flex-col gap-2"}>
    <Text text={header} className={"text-lg font-semibold"} />
    <LinesEllipsis
      className={"w-full max-h-[70px] overflow-clip"}
      text={description}
      maxLine="2"
      ellipsis=".."
      trimRight
      basedOn="letters"
    />
  </div>
);

const SaleFullCard = ({ card }: { card: ResponseShortSale }) => (
  <Link href={`/sales/${(card as any).urlMask}`} className={cn(wrapperCV)}>
    <img
      className={"w-full h-[140px] lg:size-[124px] xl:size-[174px] rounded-[6px] xl:rounded-xl object-scale-down"}
      src={card.image}
      alt={"Изображение акции"}
    />
    <div className={"w-full flex flex-col gap-2"}>
      <SaleFullCard.TopRow
        info={card.discount === 100 ? "Бесплатно" : `Скидка ${card.discount}%`}
        duration={card.deadline!!}
      />
      <SaleFullCard.MainCol description={card.description!!} header={card.name} />
    </div>
  </Link>
);

SaleFullCard.MainCol = MainCol;
SaleFullCard.TopRow = TopRow;

export default SaleFullCard;
