"use client"

import React, {useState} from 'react';
import MobilePageWrapper from "@/components/mobile/wrappers/mobile-page-wrapper/MobilePageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import {FiX} from "react-icons/fi";
import {PopupProps} from "@/types/props/Popup";

import ProductPhoto1 from "@/public/images/prodcut-card/product-image-1.png";
import ProductPhoto2 from "@/public/images/prodcut-card/product-image-2.png";
import ProductPhoto3 from "@/public/images/prodcut-card/product-image-3.png";
import ProductPhoto4 from "@/public/images/prodcut-card/product-image-4.png";
import {cn} from "@/utlis/cn";

const MobilePhotoGalleryPopup = (props: PopupProps) => {

    const galleryData: string[] = [
        ProductPhoto1.src, ProductPhoto2.src,
        ProductPhoto3.src, ProductPhoto4.src
    ]

    const [activeImage, setActiveImage] = useState<string>(galleryData[0])

    return (
        <MobilePageWrapper className={"sm:hidden fixed h-full z-40 top-0 overflow-y-scroll"}>
            <HeaderRow
                rightContent={<FiX size={"18px"} onClick={props.onClose}/>}
                leftContent={"1 из 8"}
                header={"Фотографии"}
                theme={"bordered"}
            />
            <img
                className={"w-full h-[350px] object-scale-down"}
                src={activeImage}
                alt={'/'}
            />
            <section className={"w-full overflow-x-scroll"}>
                <div className={"w-[120vw] flex flex-row gap-2"}>
                    {
                        galleryData.map((photo, key) => {

                            const imageCV = [
                                "w-[90px] h-[90px] rounded-xl",
                                {"border-2 border-light-gray": photo === activeImage}
                            ]

                            return (
                                <button key={key} onClick={() => setActiveImage(photo)}>
                                    <img
                                        className={cn(imageCV)}
                                        src={photo} alt={'/'}
                                    />
                                </button>
                            )

                        })
                    }
                </div>
            </section>
        </MobilePageWrapper>
    );
};

export default MobilePhotoGalleryPopup;
