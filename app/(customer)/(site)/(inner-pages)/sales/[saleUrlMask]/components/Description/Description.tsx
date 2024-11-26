import Text from "@/components/atoms/Text/Text";
import { SaleDetails } from "../../model";

export const Description = ({ sale }: { sale: SaleDetails }) => (
  <div className="w-full md:w-[calc(100vw-48px)] lg:w-full flex flex-col gap-2">
    <Text className="md:text-xl text-lg font-medium">Описание</Text>
    <Text className="w-full">{sale.description}</Text>
  </div>
);
