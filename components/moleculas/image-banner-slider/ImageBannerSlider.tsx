import style from "./ImageBannerSlider.module.css"

import {useState} from "react";
import Image from "next/image";
import PagingSlider from "@/components/atoms/paging-slider/PagingSlider";
import {ImageLink} from "@/types/links";

type BannerSliderTypes = {
    banners: ImageLink[]
}

const ImageBannerSlider = ({banners}: BannerSliderTypes) => {

    const [activeBanner, setActiveBanner] = useState<number>(0)

    return (
        <div className={style.wrapper}>
            <Image
                className={style.image}
                src={banners[activeBanner].image}
                quality={100}
                alt={'/'}
            />
            <div className={style.absoluteDiv}>
                <PagingSlider
                    activePage={activeBanner}
                    setActivePage={(banner : number) => setActiveBanner(banner)}
                    pageNumber={banners.length}
                />
            </div>
        </div>
    )
}

export default ImageBannerSlider
