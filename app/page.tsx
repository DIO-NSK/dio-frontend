"use client"


import MockImage from "@/public/images/card-image.png"
import ProductCard from "@/components/organisms/cards/product-card/ProductCard";

const MainPageScreen = () => {

  const mockProductCard = {
    price: 500,
    descr: "Кулер с длинным текстом чтобы показать ограничение по символам",
    image: MockImage
  }

  const mockCardArray = [
      mockProductCard,
      mockProductCard,
      mockProductCard,
      mockProductCard,
  ]

  return (
    <div className={"w-full h-screen px-[100px] grid grid-cols-12 gap-[20px]"}>
        {
            mockCardArray.map((productCard) => {
                return <ProductCard productCard={productCard} />
            })
        }
    </div>
  )
}

export default MainPageScreen