import {ResponsePromotion} from "@/app/admin/promo/models/promotion.model";
import {Link} from "@mui/joy";
import {cn} from "@/utlis/cn";

const SaleCard = ({promotion}: { promotion: ResponsePromotion }) => {

    const wrapperCV = [
        "w-full h-[120px] sm:h-[200px] flex items-center",
        "justify-center rounded-xl overflow-clip"
    ]

    return (
        <Link href={`/sales/${promotion.id}`} className={cn(wrapperCV)}>
            <img
                className={"h-full w-full object-cover rounded-xl"}
                alt={'Изображение акции'}
                src={promotion.image}
            />
        </Link>
    )
}

export default SaleCard
