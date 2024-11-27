import Loading from "@/components/mobile/loading/Loading";
import dynamic from "next/dynamic";
import { Header } from "../Header";
import { ProductsBlockProps } from "./ProductsBlock.types";

const FavoritesContentBlock = dynamic(
  () =>
    import("@/components/organisms/loading-blocks/favorites/FavoritesContentBlock").then(
      (block) => block.FavoritesContentBlock,
    ),
  { loading: () => <Loading className={"col-span-9"} /> },
);

export const ProductsBlock = ({ products }: ProductsBlockProps) => (
  <>
    <Header selectedCards={products} />
    <FavoritesContentBlock products={products} />
  </>
);
