import SkeletonCatalogCategoryCard from "@/components/organisms/catalog-category-card/SkeletonCatalogCategoryCard";
import CatalogHeaderSkeleton from "@/components/skeletons/catalog/CatalogHeaderSkeleton";
import InnerPageWrapper from "@/components/wrappers/InnerPageWrapper/InnerPageWrapper";

const Loading = () => (
  <>
    <CatalogHeaderSkeleton />
    <InnerPageWrapper classNames={{ mobileWrapper: "gap-4" }}>
      {Array.from({ length: 6 }).map((_, key) => (
        <SkeletonCatalogCategoryCard key={key} />
      ))}
    </InnerPageWrapper>
  </>
);

export default Loading;
