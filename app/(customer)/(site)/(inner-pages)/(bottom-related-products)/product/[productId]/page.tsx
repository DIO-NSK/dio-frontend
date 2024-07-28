import ClientProductCardPage from "../[productId]/ui/ClientProductCardPage";
import {getAllProducts, getProductById} from "./page.hooks";
import {Metadata} from "next";
import {notFound} from "next/navigation";

export const generateStaticParams = async () => {
    const catalog = await getAllProducts();

    return catalog.products.map(product => ({productId: product.id.toString()}));
}

export const generateMetadata = async ({params: {productId}}: { params: { productId: number } }): Promise<Metadata> => {
    const product = await getProductById(productId).catch(notFound);

    return {
        title: product.name,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: product.photos
        }
    }
}

const ProductCardPage = async ({params: {productId}}: { params: { productId: number } }) => (
    <ClientProductCardPage productId={productId}/>
)
export default ProductCardPage
