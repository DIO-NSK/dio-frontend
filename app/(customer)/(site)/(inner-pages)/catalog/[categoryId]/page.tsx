import {getCatalog} from "@/app/(customer)/(site)/(inner-pages)/catalog/categories/[sectionId]/page.hooks";
import ClientCatalogScreen from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/ui/ClientCatalogScreen";
import {Metadata} from "next";
import {
    getCategoryBreadcrumbs,
    getCategoryProducts
} from "@/app/(customer)/(site)/(inner-pages)/catalog/[categoryId]/page.hooks";
import {notFound} from "next/navigation";

export const generateStaticParams = async () => {
    const catalog = await getCatalog();

    return catalog.map(section => section.categories
        .map(category => ({categoryId: category.id.toString()}))).flat();
}

export const generateMetadata = async ({params: {categoryId}}: { params: { categoryId: number } }): Promise<Metadata> => {
    const breadcrumbs = await getCategoryBreadcrumbs(categoryId).catch(notFound);
    const products = await getCategoryProducts(categoryId).catch(notFound);

    return {
        title: `${breadcrumbs.categoryName} — доставка питьевой воды по Новосибирску и области DIO`,
        description : `Список всех товаров категории «${breadcrumbs.categoryName}»`,
        keywords : products.map(product => product.name),
        openGraph: {
            title: `${breadcrumbs.categoryName} — доставка питьевой воды по Новосибирску и области DIO`,
            description : `Список всех товаров категории «${breadcrumbs.categoryName}»`,
            images: products.map(product => product.image)
        }
    }
}

const CatalogScreen = ({params: {categoryId}}: { params: { categoryId: number } }) => (
    <ClientCatalogScreen categoryId={categoryId}/>
)

export default CatalogScreen
