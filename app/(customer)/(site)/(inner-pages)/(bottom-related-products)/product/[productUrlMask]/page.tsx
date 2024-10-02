import ClientProductCardPage from "./ui/ClientProductCardPage";
import {getAllProducts} from "./page.hooks";
import {Metadata} from "next";
import {notFound} from "next/navigation";
import {getSeoByUrlMask} from "@/app/admin/seo/page.api";

export const generateStaticParams = async () => {
    const catalog = await getAllProducts();

    return catalog.products.map(product => ({ productUrlMask: (product as any).productUrlMask }));
}

export const generateMetadata = async ({ params: { productUrlMask } }: { params: { productUrlMask: string } }): Promise<Metadata> => {
    const { title, description, keywords } = await getSeoByUrlMask(productUrlMask).catch(notFound);

    return {
        title: title,
        description: description,
        keywords: keywords
    }
}

const ProductCardPage = async ({ params: { productUrlMask } }: { params: { productUrlMask: string } }) => {
    const { entityId: productId } = await getSeoByUrlMask(productUrlMask);

    return (
        <ClientProductCardPage productId={productId as number} />
    )
}
export default ProductCardPage
