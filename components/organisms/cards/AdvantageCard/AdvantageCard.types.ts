import { IconHeaderCard } from "@/types/cards";

interface AdvantageCardClassnames {
  wrapper?: string;
  text?: string;
}

interface AdvantageCardProps {
  classNames?: AdvantageCardClassnames;
  card: IconHeaderCard;
}

export type { AdvantageCardClassnames, AdvantageCardProps };
