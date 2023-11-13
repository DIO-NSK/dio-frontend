import style from "./ContentImage.module.css"
import Image from "next/image"
import {StaticImport} from "next/dist/shared/lib/get-img-props";

export const ContentImage = ({image}: { image: string | StaticImport }) => {
    return (
        <Image src={image} alt={'/'}
               className={style.image} width={500}
               height={300} quality={100}
        />
    )
}
