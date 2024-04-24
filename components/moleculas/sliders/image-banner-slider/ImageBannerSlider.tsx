import {useEffect, useState} from "react";
import PagingSlider from "@/components/atoms/paging-slider/PagingSlider";
import {$banners, getAllBannersEvent} from "@/app/admin/promo/models/banner.model";
import {useUnit} from "effector-react";
import {ClassValue} from "clsx";
import {cn} from "@/utlis/cn";
import Link from "next/link";

const sliderCV : ClassValue[] = [
    "absolute z-20 bottom-[30px] w-full",
    "flex flex-col justify-end items-center"
]

const ImageBannerSlider = () => {

    const [banners, getBanners] = useUnit([$banners, getAllBannersEvent])
    const [activeBanner, setActiveBanner] = useState<number>(0)

    useEffect(() => {
        getBanners()
    }, []);

    if (banners.length) return (
        <div className={"relative cursor-pointer h-[390px] col-span-9 rounded-2xl overflow-clip"}>
            <div className={cn(sliderCV)}>
                <PagingSlider
                    activePage={activeBanner}
                    setActivePage={setActiveBanner}
                    pageNumber={banners.length}
                />
            </div>
            <Link href={banners[activeBanner].link}>
                <img
                    className={"w-full h-full object-cover"}
                    src={banners[activeBanner].image}
                    alt={'/'}
                />
            </Link>
        </div>
    )
}

export default ImageBannerSlider
