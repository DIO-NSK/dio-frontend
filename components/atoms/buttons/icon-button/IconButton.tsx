
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

type IconButtonTypes = {
    src : string | StaticImport,
    size: number,
    onClick : () => void
}
const IconButton = ({src, size, onClick} : IconButtonTypes) => {
    return (
        <Image
            src={src}
            alt={'/'}
            width={size}
            height={size}
            quality={100}
            onClick={onClick}
        />
    )
}

export default IconButton
