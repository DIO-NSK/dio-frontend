import {ResponsePromotion} from "@/app/admin/promo/models/promotion.model";
import {Link} from "@mui/joy";
import {cn} from "@/utlis/cn";

const wrapperCV = [
    "w-full h-[120px] lg:h-[150px] xl:h-[200px] flex items-center",
    "justify-center rounded-xl overflow-clip"
]

const swiperCN = cn(wrapperCV, "!w-full !flex-shrink-0")

const SaleCard = ({promotion, hasSwiper}: { promotion: ResponsePromotion, hasSwiper ?: boolean}) => (
    <Link href={`/sales/${(promotion as any).urlMask}`} className={cn(hasSwiper ? swiperCN : wrapperCV)}>
        <img
            className={"h-full w-full object-cover rounded-xl"}
            alt={'Изображение акции'} src={promotion.image}
        />
    </Link>
)

export default SaleCard
