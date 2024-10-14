'use client';

import { ResponseCustomerBanner } from "@/app/(customer)/(site)/page.hooks";
import { cn } from "@/utlis/cn";
import { useResponsiveImage } from "@/utlis/hooks/useResponsiveImage";
import { Link } from "@mui/joy";

const wrapperCV = [
    "w-full h-[120px] lg:h-[150px] xl:h-[200px] flex items-center",
    "justify-center rounded-xl overflow-clip"
]

const swiperCN = cn(wrapperCV, "!w-full !flex-shrink-0")

const SaleCard = ({ promotion, hasSwiper }: { promotion: ResponseCustomerBanner, hasSwiper?: boolean }) => {
    const image = useResponsiveImage(promotion);

    console.log('image', image, promotion)

    return (
        <Link href={`/sales/${(promotion as any).urlMask}`} className={cn(hasSwiper ? swiperCN : wrapperCV)}>
            <img
                className={"h-full w-full object-cover rounded-xl"}
                alt={'Изображение акции'} src={image}
            />
        </Link>
    )
}

export default SaleCard
