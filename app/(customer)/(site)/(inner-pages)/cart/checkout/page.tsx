"use client"

import InnerPageWrapper from "@/components/wrappers/inner-page-wrapper/InnerPageWrapper";
import HeaderRow from "@/components/moleculas/rows/header-row/HeaderRow";
import ShoppingCartTotalPriceCard
    from "@/components/organisms/cards/shopping-cart-total-price-card/ShoppingCartTotalPriceCard";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import TextInput from "@/components/atoms/inputs/text-input/TextInput";
import {useState} from "react";
import {TextInputProps} from "@/types/props/inputs/TextInput";
import {PhoneInputProps} from "@/types/props/inputs/PhoneInput";
import SelectInput from "@/components/atoms/inputs/select-input/SelectInput";
import {SelectItem} from "@/types/props/Select";
import MultiselectButton from "@/components/atoms/buttons/multiselect-button/MultiselectButton";
import Text from "@/components/atoms/text/text-base/Text";
import TextArea from "@/components/atoms/inputs/text-area/TextArea";
import Button from "@/components/atoms/buttons/button/Button";
import {FiPlus} from "react-icons/fi";
import PickAddressPopup from "@/components/organisms/popups/checkout/PickAddressPopup";

type ShortInputData = Pick<(TextInputProps | PhoneInputProps),
    "labelText" | "placeholder" | "value" | "onChange" | "inputMask"
>

const CheckoutUserDataBlock = () => {

    const [username, setUsername] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const userDataInputs: ShortInputData[] = [
        {
            labelText: "Имя",
            placeholder: "Введите имя",
            value: username,
            onChange: setUsername,
        }, {
            labelText: "Фамилия",
            placeholder: "Введите фамилию",
            value: surname,
            onChange: setSurname
        }, {
            labelText: "Телефон",
            placeholder: "+7 (___) ___-__-__",
            value: phoneNumber,
            onChange: setPhoneNumber,
            inputMask: "+9 (999) 999-99-99"
        }, {
            labelText: "Электронная почта",
            placeholder: "Введите почту",
            value: email,
            onChange: setEmail
        },
    ]

    return (
        <BackgroundBlockWrapper header={"Данные получателя"}>
            {
                userDataInputs.map((input, key) =>
                    <TextInput {...input} key={key} theme={"filled"}/>
                )
            }
        </BackgroundBlockWrapper>
    )
}

const CheckoutDeliveryAddressBlock = () => {

    const [city, setCity] = useState<string>("")
    const [street, setStreet] = useState<string>("")
    const [home, setHome] = useState<string>("")
    const [office, setOffice] = useState<string>("")
    const [doorway, setDoorway] = useState<string>("")
    const [floor, setFloor] = useState<string>("")

    const [
        isPopupVisible,
        setPopupVisible
    ] = useState<boolean>(false)

    const handleSwitchPopupState = () => setPopupVisible(!isPopupVisible)

    const deliveryAddressInputs: ShortInputData[] = [
        {
            labelText: "Город",
            placeholder: "Введите город проживания",
            value: city,
            onChange: setCity,
        }, {
            labelText: "Улица",
            placeholder: "Введите название улицы",
            value: street,
            onChange: setStreet,
        }, {
            labelText: "Дом / Корпус",
            placeholder: "Введите номер дома",
            value: home,
            onChange: setHome,
        }, {
            labelText: "Квартира / Офис",
            placeholder: "Введите номер квартиры",
            value: office,
            onChange: setOffice,
        }, {
            labelText: "Подъезд",
            placeholder: "Введите номер подъезда",
            value: doorway,
            onChange: setDoorway,
        }, {
            labelText: "Этаж",
            placeholder: "Введите этаж",
            value: floor,
            onChange: setFloor,
        }
    ]

    return (
        <>
            {
                isPopupVisible && <PickAddressPopup
                    onClose={handleSwitchPopupState}
                />
            }
            <BackgroundBlockWrapper
                header={"Адрес доставки"}
                rightContent={
                    <Button
                        text={"Выбрать существующий"}
                        onClick={handleSwitchPopupState}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        size={"sm"}
                    />
                }
            >
                {
                    deliveryAddressInputs.map((input, key) =>
                        <TextInput {...input} theme={"filled"} key={key}/>
                    )
                }
            </BackgroundBlockWrapper>
        </>
    )
}

const CheckoutTimeBlock = () => {

    const dropdownItems: SelectItem[] = [
        {text: "10:00 — 11:00", isSelected: true},
        {text: "11:00 — 12:00", isSelected: false},
        {text: "12:00 — 13:00", isSelected: false},
        {text: "13:00 — 14:00", isSelected: false},
    ]

    const [
        activeItem,
        selectItem
    ] = useState<SelectItem>(dropdownItems[0])

    return (
        <BackgroundBlockWrapper header={"Дата и время доставки"}>
            <TextInput
                placeholder={"Выберите дату доставки"}
                labelText={"Дата доставки"}
                theme={"filled"}
            />
            <SelectInput
                width={"col-span-1"}
                label={"Время доставки"}
                items={dropdownItems}
                onSelect={selectItem}
                selectedItem={activeItem}
                className={"bg-white border-2 border-light-gray"}
            />
        </BackgroundBlockWrapper>
    )

}

const CheckoutPaymentBlock = () => {

    const multiselectElements = ["Банковской картой онлайн", "Наличными или картой при получении"]

    const [
        activeElement,
        setActiveElement
    ] = useState<string>(multiselectElements[0])

    return (
        <div className={"w-full flex flex-col gap-3"}>
            <Text text={"Способ оплаты"} className={"text-lg font-medium"}/>
            <MultiselectButton
                activeElement={activeElement}
                elements={multiselectElements}
                selectElement={setActiveElement}
            />
        </div>
    )

}

const CheckoutAdditionalBlock = () => {

    const [comment, setComment] = useState<string>("")
    const hintMessage = "Если выбранное Вами время доставки не будет совпадать с графиком доставки" +
        "вашего района, с вами обязательно свяжется менеджер для уточнения информации"

    return (
        <BackgroundBlockWrapper header={"Дополнительно"}>
            <TextArea
                classNames={{wrapper: "col-span-full", input: "min-h-[150px] max-h-[300px]"}}
                labelText={"Пожелания к заказу"}
                placeholder={"Уточните детали заказа в комментарии"}
                value={comment}
                onChange={setComment}
                hintText={{type: "neutral", hintMessage: hintMessage}}
                theme={"filled"}
            />
        </BackgroundBlockWrapper>
    )
}

const CheckoutPage = () => {

    const handleButtonClick = () => console.log("Order is confirmed")

    return (
        <InnerPageWrapper>
            <div className={"col-span-9 flex flex-col gap-7"}>
                <HeaderRow header={"Оформление заказа"} className={"w-full"}/>
                <CheckoutUserDataBlock/>
                <CheckoutDeliveryAddressBlock/>
                <CheckoutTimeBlock/>
                <CheckoutPaymentBlock/>
                <CheckoutAdditionalBlock/>
                <Button
                    text={"Оформить заказ"}
                    onClick={handleButtonClick}
                    classNames={{button: "w-1/4"}}
                />
            </div>
            <ShoppingCartTotalPriceCard
                amount={2}
                discount={1200}
                totalPrice={7200}
            />
        </InnerPageWrapper>
    );

};

export default CheckoutPage;
