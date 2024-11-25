import Text from "@/components/atoms/Text/Text";
import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";

export const Chips = ({ isNew, discountPercent, inStock }: ResponseProductSearch) => (
  <span className={"absolute left-5 top-5 z-10 flex flex-row gap-2"}>
    {isNew ? (
      <span className={"px-[10px] py-[6px] rounded-[5px] bg-blue-500"}>
        <Text className={"uppercase text-[10px] font-medium text-white"} text={"Новинка"} />
      </span>
    ) : null}
    {discountPercent !== 0 ? (
      <span className={"px-[10px] py-[6px] rounded-[5px] bg-green-500 h-fit"}>
        <Text
          className={"uppercase whitespace-nowrap text-[10px] font-medium text-white"}
          text={`Скидка ${discountPercent} %`}
        />
      </span>
    ) : null}
    {!inStock ? (
      <span className={"px-[10px] py-[6px] rounded-[5px] bg-gray-100 h-fit"}>
        <Text className={"uppercase whitespace-nowrap text-[10px] font-medium text-text-gray"} text={"Нет в наличии"} />
      </span>
    ) : null}
  </span>
);
