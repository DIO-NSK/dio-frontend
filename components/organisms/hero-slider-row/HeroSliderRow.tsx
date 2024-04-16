import ImageBannerSlider from "@/components/moleculas/sliders/image-banner-slider/ImageBannerSlider";
import MockBannerImage1 from "@/public/images/banner-image-1.png";
import MockBannerImage2 from "@/public/images/banner-image-2.jpg";
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";
import MockImage from "@/public/images/card-image.png";
import {ImageLink} from "@/types/links";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

const HeroSliderRow = () => {

    const mockProductCard : ResponseProductSearch = {
        inCart : false, inFavourites : false,
        price: 500, discountPercent : 20, id : 1,
        name: "Кулер с длинным текстом чтобы показать ограничение по символам",
        image: MockImage.src
    }

    return (
        <div className={"hidden col-span-full sm:grid grid-cols-12 gap-[20px]"}>
            <ImageBannerSlider />
            <ProductCard productCard={mockProductCard} />
        </div>
    );

};

export default HeroSliderRow;
