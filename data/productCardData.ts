import MockImage from "@/public/images/card-image.png";

const mockProductCard = {
    price: 500,
    descr: "Кулер с длинным текстом чтобы показать ограничение по символам",
    image: MockImage
}
const mockAnotherProductCard = {
    price: 7000,
    descr: "WATERPROOF",
    image: MockImage
}


export const mockCardArray = [
    mockProductCard, mockAnotherProductCard,
    mockProductCard, mockAnotherProductCard,
]