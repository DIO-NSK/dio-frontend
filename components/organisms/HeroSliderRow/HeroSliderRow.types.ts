import { ResponseCustomerBanner } from "@/app/(customer)/(site)/page.hooks";
import { ResponseProductSearch } from "@/types/dto/user/product/ResponseProductSearch";

export interface HeroSliderRowProps {
    banners: ResponseCustomerBanner[],
    dayProducts: ResponseProductSearch[]
}