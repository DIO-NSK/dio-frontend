import {cn} from "@/utlis/cn";

export const ContentImage = ({image, className}: { image: string, className ?: string}) => (
    <img
        className={cn("w-full sm:col-span-6 h-[200px] sm:h-[300px] object-cover rounded-xl", className)}
        src={image} alt={'Фотография производства'}
    />
)
