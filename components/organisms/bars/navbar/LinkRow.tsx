import { HStack, Image } from "@chakra-ui/react";
import Link from "next/link";
import { iconData } from "./Navbar.data";

export const LinkRow = () => (
  <HStack gap="1rem">
    {iconData.map(({ href, src }, key) => (
      <Link href={href} target="_blank" rel="noopener noreferer" key={key}>
        <Image src={src} alt="Социальная сеть" className="xl:size-6 size-[18px]" />
      </Link>
    ))}
  </HStack>
);
