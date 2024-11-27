"use client";

import Button from "@/components/atoms/buttons/button/Button";
import EmptyPage from "@/components/organisms/EmptyPage/EmptyPage";
import { useRouter } from "next/navigation";

export const CATALOG_PATH = "/our-waters?brand=DIO";

export const Empty = () => {
  const router = useRouter();

  const handleClick = () => router.push(CATALOG_PATH);

  return (
    <EmptyPage
      className="sm:col-span-9 sm:items-center sm:justify-center sm:ml-0"
      description="Добавьте продукты в избранное и возвращайтесь снова!"
      header="Нет избранных товаров"
    >
      <Button onClick={handleClick}>К продуктам</Button>
    </EmptyPage>
  );
};
