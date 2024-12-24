import Text from "@/components/atoms/Text/Text";

export const EmptyRightBlock = () => (
  <section className="w-full md:col-span-9 flex flex-col gap-2 rounded-xl bg-bg-light-blue p-7">
    <Text className="text-[20px] text-link-blue font-semibold">Упс! Ничего не нашли..</Text>
    <Text>Попробуйте изменить параметры фильтров</Text>
  </section>
);
