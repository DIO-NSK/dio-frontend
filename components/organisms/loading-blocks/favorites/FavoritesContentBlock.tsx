import React from 'react';
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";

const FavoritesContentBlock = ({products}: { products: ResponseProductSearch[] }) => (
    <section className={"w-full flex flex-col gap-3 sm:gap-7 sm:grid sm:grid-cols-9"}>
        {products.map((card, index) => (
            <ProductCard
                classNames={{mainWrapper: "w-full"}}
                productCard={card}
                key={index}
            />
        ))}
    </section>
)

export default FavoritesContentBlock;
