import {
    ResponseCartItem, ResponseCartSaleItem,
    ResponseUserCart
} from "@/app/(customer)/(site)/(inner-pages)/(bottom-related-products)/cart/model";
import { useOrderPrice } from '@/app/(customer)/(site)/(inner-pages)/cart/checkout/page.hooks';
import { $orderToRepeat } from "@/app/(customer)/profile/orders/model";
import ChevronButton from "@/components/atoms/buttons/chevron-button/ChevronButton";
import Text from "@/components/atoms/text/text-base/Text";
import StickyCardWrapper from "@/components/wrappers/sticky-card-wrapper/StickyCardWrapper";
import { HeaderDescription } from "@/types/dto/text";
import { ProfileOrderItem } from "@/types/dto/user/order/ResponseProfileOrder";
import { useDiscount } from "@/utlis/hooks/product/useDiscount";
import { useToggle } from "@/utlis/hooks/useToggle";
import { useUnit } from "effector-react";

const CheckoutCardItem = ({ productItem }: { productItem: ResponseCartItem | ProfileOrderItem | ResponseCartSaleItem }) => {
    const [oldPrice] = useDiscount(productItem.price, (productItem as ResponseCartItem)?.discountPercent);
    const totalOldPrice = oldPrice * productItem.quantity;
    const actualPrice = productItem.price * productItem.quantity;

    return (
        <div className={"pt-5 w-full flex flex-col gap-1"}>
            <div className={"w-full flex flex-row items-baseline justify-between"}>
                <div className={"flex flex-row items-baseline gap-2"}>
                    <Text
                        text={`${actualPrice.toFixed(2)} ₽`}
                        className={"text-link-blue font-medium"}
                    />
                    {
                        totalOldPrice !== 0 && <Text
                            text={`${totalOldPrice.toFixed(2)} ₽`}
                            className={"text-text-gray line-through text-sm"}
                        />
                    }
                </div>
                <Text
                    text={`${productItem.quantity} шт.`}
                    className={"text-text-gray text-sm"}
                />
            </div>
            <Text
                text={productItem.name}
                className={"font-medium"}
            />
        </div>
    )
}

const CheckoutCard = ({ cart }: { cart: ResponseUserCart }) => {
    const orderToRepeat = useUnit($orderToRepeat)
    const expanded = useToggle(true)
    const {totalActualPrice, totalCartLength, totalDiscount} = useOrderPrice();

    const totalData: HeaderDescription[] = [
        { header: "Скидка", description: `${totalDiscount?.toFixed(2)} ₽` },
        { header: "Итого", description: `${totalActualPrice?.toFixed(2)} ₽` },
    ]

    return (
        <StickyCardWrapper startCol={"lg:col-start-9 lg:col-span-4 xl:col-start-10 xl:col-span-3 lg:mt-[40px] xl:mt-0"}>
            <div className={"pb-5 flex flex-row items-center justify-between border-b-2 border-light-gray"}>
                <Text text={`Выбрано ${totalCartLength} шт.`} />
                <ChevronButton isExpanded={expanded.state} setExpanded={expanded.toggleState} />
            </div>
            {
                expanded.state && <section className={"flex -mt-5 flex-col gap-4 divide-y divide-light-gray"}>
                    {
                        (orderToRepeat?.items ?? [...cart.products, ...cart.promos]).map((productItem, key) => (
                            <CheckoutCardItem productItem={productItem} key={key} />
                        ))
                    }
                </section>
            }
            <div className={"flex flex-col gap-3 divide-y divide-light-gray"}>
                {
                    totalData.map((item, key) => (
                        <div className={"pt-3 flex row items-baseline justify-between"} key={key}>
                            <Text text={item.header} className={"text-text-gray"} />
                            <Text text={item.description} />
                        </div>
                    ))
                }
            </div>
        </StickyCardWrapper>
    );

};

export default CheckoutCard;