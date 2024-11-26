import Text from "@/components/atoms/Text/Text";
import CatalogBreadcrumbs from "@/components/moleculas/catalog-breadcrumbs/CatalogBreadcrumbs";
import { VStack } from "@chakra-ui/react";
import { HeaderProps } from "./Header.types";

export const Header = ({ sale, breadcrumbs }: HeaderProps) => (
  <VStack alignItems="start" gap="8px" gridColumn="1 / -1">
    <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />
    <Text className="sm:text-2xl text-xl font-medium">{sale.name}</Text>
  </VStack>
);
