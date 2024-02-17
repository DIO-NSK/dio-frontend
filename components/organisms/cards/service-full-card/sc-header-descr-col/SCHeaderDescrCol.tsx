import Text from "@/components/atoms/text/text-base/Text";
import {cn} from "@/utlis/cn";

const SCHeaderDescrCol = ({header, descr}: {
    header: string,
    descr: string,
}) => {

    const wrapperCV = [
        "w-full flex flex-col gap-3 sm:gap-4 pb-5",
        "border-b-2 border-light-gray"
    ]

    return (
        <div className={cn(wrapperCV)}>
            <Text text={header} className={"text-[18px] sm:text-[20px] font-semibold"}/>
            <Text text={descr}/>
        </div>
    )
}

export default SCHeaderDescrCol
