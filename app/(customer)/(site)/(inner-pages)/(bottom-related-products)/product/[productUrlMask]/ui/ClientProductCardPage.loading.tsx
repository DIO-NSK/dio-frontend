import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";
import { Skeleton } from "@chakra-ui/react";

export const ClientProductCardPageLoading = () => (
  <section className="w-full flex flex-col">
    <Skeleton w="full" h="76px" mb="28px" />
    <InnerPageWrapper classNames={{ mobileWrapper: "px-5 -mt-7" }}>
      <div className="w-full col-span-full flex flex-col gap-7 md:grid md:grid-cols-12">
        <div className="w-full flex flex-col gap-5 md:grid md:grid-cols-9 md:col-span-8 md:gap-6 xl:col-span-9 xl:gap-7">
          <Skeleton gridColumn="span 5 / span 5" h="300px" rounded="lg" />
          <div className="col-span-4 w-full flex flex-col gap-5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton w="full" h="60px" key={i} />
            ))}
          </div>
          <Skeleton gridColumn="1 / -1" w="full" h="300px" />
        </div>
        <Skeleton gridColumnStart="span 9" gridColumn="span 3 / span 3" h="200px" rounded="lg" />
      </div>
    </InnerPageWrapper>
  </section>
);
