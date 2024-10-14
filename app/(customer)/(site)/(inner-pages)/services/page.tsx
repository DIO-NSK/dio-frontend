import { Metadata } from "next";
import ClientServicesScreen from "@/app/(customer)/(site)/(inner-pages)/services/ui/ClientServicesScreen";
import { getSeoByUrlMask } from "@/app/admin/seo/page.api";

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getSeoByUrlMask(__dirname.split('/').at(-1) as string);

    return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords
    }
}

const ServiceCatalogScreen = async () => (<ClientServicesScreen />)

export default ServiceCatalogScreen
