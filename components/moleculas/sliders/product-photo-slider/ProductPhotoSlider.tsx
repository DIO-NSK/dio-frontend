import {useEffect, useState} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";
import {COLOR} from "@/components/colors";

const MainPhotoCard = ({photo}: { photo ?: string }) => {
    return (
        <img
            className={"w-full h-[300px] object-cover rounded-xl"}
            src={photo} alt={'/'}
        />
    )
}

const PhotoCard = ({photo, isActive, setActive}: {
    photo ?: string,
    isActive: boolean,
    setActive: (photo ?: string) => void
}) => {
    return (
        <img
            className={"h-[100px] w-full rounded-xl border-light-gray object-fill border-[2px] hover:pointer"}
            style={{borderColor: isActive ? COLOR["light-gray"] : COLOR["white"]}}
            onClick={() => setActive(photo)}
            src={photo} alt={'/'}
        />
    )
}

const PhotoSlider = ({photos, activePhoto, setActive}: {
    photos: string[],
    activePhoto ?: string,
    setActive: (photo ?: string) => void
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
        <div className={"w-full flex flex-row items-center gap-[10px]"}>

            <FiChevronLeft
                size={"20px"}
                className={"stroke-text-gray hover:cursor-pointer"}
                onClick={() => shiftLeft()}
            />

            <div className={"flex flex-row gap-[10px]"}>
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
    photos: string[],
    activePhoto ?: string,
    setActive: (photo ?: string) => void
}) => {

    return (
        <div className={"hidden sm:col-start-1 sm:col-span-5 sm:flex flex-col gap-5"}>
            <ProductPhotoSlider.MainPhotoCard photo={activePhoto}/>
            <ProductPhotoSlider.PhotoSlider
                activePhoto={activePhoto}
                setActive={setActive}
                photos={photos}
            />
        </div>
    )
}

ProductPhotoSlider.PhotoCard = PhotoCard
ProductPhotoSlider.MainPhotoCard = MainPhotoCard
ProductPhotoSlider.PhotoSlider = PhotoSlider

export default ProductPhotoSlider
