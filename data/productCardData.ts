import MockImage from "@/public/images/card-image.png";
import {ResponseProductSearch} from "@/types/dto/user/product/ResponseProductSearch";

const mockProductCard : ResponseProductSearch = {
    price: 500, discountPercent : 0, id : 1,
    name: "Кулер с длинным текстом чтобы показать ограничение по символам",
    image: MockImage.src
}
const mockAnotherProductCard : ResponseProductSearch = {
    price: 7000, discountPercent : 0, id : 1,
    name: "WATERPROOF", image: MockImage.src
}


export const mockCardArray : ResponseProductSearch[] = [
    mockProductCard, mockAnotherProductCard,
    mockProductCard, mockAnotherProductCard,
]