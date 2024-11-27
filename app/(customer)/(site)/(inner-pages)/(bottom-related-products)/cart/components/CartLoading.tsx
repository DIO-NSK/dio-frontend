import { Box, Skeleton } from "@chakra-ui/react";

const TabletAndLargerLoading = () => (
  <Box className="hidden md:grid w-full grid-cols-12 gap-6">
    <div className="col-span-9 flex flex-col gap-3">
      <Skeleton w="full" h="150px" />
      <Skeleton w="full" h="150px" />
      <Skeleton w="full" h="150px" />
    </div>
    <Skeleton gridColumn="span 3 / span 3" h="full" />
  </Box>
);

const MobileLoading = () => (
  <Box className="flex flex-col gap-4 md:hidden">
    <Skeleton w="full" h="90px" />
    <Skeleton w="full" h="90px" />
    <Skeleton w="full" h="90px" />
  </Box>
);

export const CartLoading = () => (
  <Box className="px-5 md:px-0 pb-10 w-full flex flex-col gap-6">
    <Skeleton w="full" className="h-10 md:h-[60px]" />
    <TabletAndLargerLoading />
    <MobileLoading />
  </Box>
);
