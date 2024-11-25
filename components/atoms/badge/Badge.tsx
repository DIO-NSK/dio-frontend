import Text from "@/components/atoms/Text/Text";
import { cn } from "@/utlis/cn";
import { Container } from "./Badge.styles";

export const Badge = ({ number, className }: { number: number; className?: string }) => (
  <Container className={cn("bg-link-blue", className)}>
    <Text className={"text-white font-medium text-[10px]"}>{number}</Text>
  </Container>
);
