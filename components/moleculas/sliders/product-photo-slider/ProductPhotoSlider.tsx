import style from "./ProductPhotoSlider.module.css"
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {useEffect, useState} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {COLOR} from "@/components/colors";

const MainPhotoCard = ({photo}: {
    photo: string | StaticImport
}) => {
    return (
        <Image
            className={style.mainImage}
            src={photo} alt={'/'}
            width={500} height={300}
            quality={100}
        />
    )
}

const PhotoCard = ({photo, isActive, setActive}: {
    photo: string | StaticImport,
    isActive: boolean,
    setActive: (photo: string | StaticImport) => void
}) => {
    return (
        <Image
            onClick={() => setActive(photo)}
            style={{borderColor: isActive ? COLOR["light-gray"] : COLOR["white"]}}
            className={style.image}
            width={100} height={100}
            src={photo} alt={'/'}
            quality={100}
        />
    )
}

const PhotoSlider = ({photos, activePhoto, setActive} : {
    photos: (string | StaticImport)[],
    activePhoto: string | StaticImport,
    setActive: (photo: string | StaticImport) => void
}) => {

    const orderArray: number[] = Array.from({length: photos.length}, (_, i) => i)
    const [photosOrder, setPhotosOrder] = useState<number[]>(orderArray)

    const shiftLeft = () => {
        photosOrder.unshift(photosOrder.pop() as number)
        const newArray = photosOrder.map((item) => item)
        setPhotosOrder(newArray)
    }

    const shiftRight = () => {
        photosOrder.push(photosOrder.shift() as number)
        const newArray = photosOrder.map((item) => item)
        setPhotosOrder(newArray)
    }

    useEffect(() => {
        setActive(photos[photosOrder[0]])
    }, [photosOrder])

    return (
        <div className={style.sliderRow}>

            <FiChevronLeft
                size={"20px"}
                className={"stroke-text-gray hover:cursor-pointer"}
                onClick={() => shiftLeft()}
            />

            <div className={style.imageRow}>
                {
                    photosOrder.slice(0, 4).map((index) => {
                        return <ProductPhotoSlider.PhotoCard
                            photo={photos[index]}
                            isActive={photos[index] === activePhoto}
                            setActive={setActive}
                        />
                    })
                }
            </div>

            <FiChevronRight
                size={"20px"}
                className={"stroke-text-gray hover:cursor-pointer"}
                onClick={() => shiftRight()}
            />

        </div>
    )
}

const ProductPhotoSlider = ({photos, activePhoto, setActive}: {
    photos: (string | StaticImport)[],
    activePhoto: string | StaticImport,
    setActive: (photo: string | StaticImport) => void
}) => {

    return (
        <div className={style.imageCol}>
            <ProductPhotoSlider.MainPhotoCard photo={activePhoto} />
            <ProductPhotoSlider.PhotoSlider
                photos={photos}
                activePhoto={activePhoto}
                setActive={setActive}
            />
        </div>
    )
}

ProductPhotoSlider.PhotoCard = PhotoCard
ProductPhotoSlider.MainPhotoCard = MainPhotoCard
ProductPhotoSlider.PhotoSlider = PhotoSlider

export default ProductPhotoSlider
