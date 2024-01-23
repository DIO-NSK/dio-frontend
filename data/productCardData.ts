import MockImage from "@/public/images/card-image.png";
import {ProductCard} from "@/types/product";

const mockProductCard : ProductCard = {
    price: 500,
    header: "Кулер с длинным текстом чтобы показать ограничение по символам",
    image: MockImage
}
const mockAnotherProductCard : ProductCard = {
    price: 7000,
    header: "WATERPROOF",
    image: MockImage
}


export const mockCardArray = [
    mockProductCard, mockAnotherProductCard,
    mockProductCard, mockAnotherProductCard,
]