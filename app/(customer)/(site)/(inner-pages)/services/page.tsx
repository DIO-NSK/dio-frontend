import {Metadata} from "next";
import {services} from "@/data/static/services";
import ClientServicesScreen from "@/app/(customer)/(site)/(inner-pages)/services/ui/ClientServicesScreen";

export const metadata: Metadata = {
    title: 'Услуги — доставка питьевой воды по Новосибирску и области DIO',
    keywords: services.map(serviceGroup => serviceGroup.items.map(item => item.header)).flat(),
    openGraph : {
        title : 'Услуги — доставка питьевой воды по Новосибирску и области DIO'
    }
}

const ServiceCatalogScreen = () => (<ClientServicesScreen/>)

export default ServiceCatalogScreen
