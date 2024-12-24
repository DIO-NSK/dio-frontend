import SkeletonProductCard from "@/components/organisms/cards/product-card/SkeletonProductCard/SkeletonProductCard";

export const SkeletonProductCardList = () =>
  Array.from({ length: 12 }, (_, i) => i).map((_, key) => <SkeletonProductCard key={key} />);
