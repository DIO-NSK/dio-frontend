import style from "./HeroSliderRow.module.css"
import ImageBannerSlider, {ImageLink} from "@/components/moleculas/image-banner-slider/ImageBannerSlider";
import MockBannerImage1 from "@/public/images/banner-image-1.png";
import MockBannerImage2 from "@/public/images/banner-image-2.jpg";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import MockImage from "@/public/images/card-image.png";

const HeroSliderRow = () => {

    const mockBannerArray : ImageLink[] = [
        {
            image: MockBannerImage1,
            path: "/"
        }, {
            image: MockBannerImage2,
            path: "/"
        }, {
            image: MockBannerImage1,
            path: "/"
        }, {
            image: MockBannerImage2,
            path: "/"
        }
    ]

    const mockProductCard = {
        price: 500,
        descr: "Кулер с длинным текстом чтобы показать ограничение по символам",
        image: MockImage
    }

    return (
        <div className={style.wrapper}>
            <ImageBannerSlider banners={mockBannerArray} />
            <ProductCard productCard={mockProductCard} />
        </div>
    );
};

export default HeroSliderRow;
