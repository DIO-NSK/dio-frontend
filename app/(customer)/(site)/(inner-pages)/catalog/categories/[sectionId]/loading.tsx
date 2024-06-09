import React from 'react';
import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import SkeletonCatalogCategoryCard from "@/components/organisms/catalog-category-card/SkeletonCatalogCategoryCard";
import CatalogHeaderSkeleton from "@/components/skeletons/catalog/CatalogHeaderSkeleton";

const Loading = () => (
    <>
        <CatalogHeaderSkeleton/>
        <InnerPageWrapper classNames={{mobileWrapper: "gap-4"}}>
            {Array.from({length: 6}).map((_, key) => (
                <SkeletonCatalogCategoryCard key={key}/>
            ))}
        </InnerPageWrapper>
    </>
)

export default Loading;
