import Text from "@/components/atoms/text/text-base/Text";
import Link from "next/link";

export const PhoneLink = () => (
  <Link href={"tel:+733339900"}>
    <Text className="xl:text-base text-sm" text={"+7 (383) 333-99-00"} />
  </Link>
);
