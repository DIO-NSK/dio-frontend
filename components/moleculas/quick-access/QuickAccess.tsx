import Text from "@/components/atoms/Text/Text";
import Link from "next/link";
import { features } from "./QuickAccess.constants";
import { Feature } from "./QuickAccess.types";

const QuickAccessButton = ({ name, link, icon }: Feature) => (
  <Link
    href={link}
    className="min-h-[64px] w-full flex flex-col items-center justify-center rounded-[10px] gap-1 bg-bg-light-blue p-[10px]"
  >
    <div className="size-[18px] text-link-blue shrink-0">{icon}</div>
    <Text text={name} className="text-link-blue text-xs font-medium" />
  </Link>
);

export const QuickAccess = () => (
  <div className="md:hidden w-full flex flex-row items-center gap-3">
    {features.map((feature, id) => (
      <QuickAccessButton {...feature} key={id} />
    ))}
  </div>
);
