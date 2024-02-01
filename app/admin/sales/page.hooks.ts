import {usePathname, useRouter} from "next/navigation";

export const useAdminPanelSalesPage = () => {

    const router = useRouter()
    const pathname = usePathname()

    const handleProductClick = () => router.push(pathname.concat("/1"))

    return { handleProductClick}

}