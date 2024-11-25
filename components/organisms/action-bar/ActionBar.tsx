"use client";

import { ActionBarRoot } from "@chakra-ui/react";

import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { items } from "./ActionBar.data";
import { Content } from "./ActionBar.styles";

export const ActionBar = () => {
  const pathname = usePathname();

  const getColor = (link: string) => (pathname.includes(link) ? "text-link-blue" : "text-text-gray");

  return (
    <ActionBarRoot open>
      <Content className="md:hidden flex" background="white">
        {items.map(({ link, name, icon }, id) => (
          <Link href={link} className="flex flex-col gap-1 items-center" key={id}>
            <div className={cn("size-[18px]", getColor(link))}>{icon}</div>
            <Text className={cn("text-[11px]", getColor(link))} text={name} />
          </Link>
        ))}
      </Content>
    </ActionBarRoot>
  );
};
