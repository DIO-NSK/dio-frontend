import React from 'react';
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";

const FavoritesContentBlock = ({products}: { products: ResponseProductSearch[] }) => (
    <section className={"w-full flex flex-col gap-3 md:gap-5 xl:gap-7 md:grid md:grid-cols-8 xl:grid-cols-9"}>
        {products.map((card, index) => (
            <ProductCard
                classNames={{mainWrapper: "w-full md:col-span-4 xl:col-span-3"}}
                productCard={card}
                key={index}
            />
        ))}
    </section>
)

export default FavoritesContentBlock;
