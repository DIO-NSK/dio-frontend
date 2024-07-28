import React, {useEffect, useState} from 'react';
import {useUnit} from "effector-react";
import {FieldValues, FormProvider, useForm} from "react-hook-form";
import {CreateOrderDraftData, CreateOrderDraftSchema} from "@/schemas/customer/checkout/CreateOrderDraftSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import Form from "@/components/atoms/form/Form";
import Button from "@/components/atoms/buttons/button/Button";
import {InputPrefilledData} from "@/types/props/inputs/InputPrefilledData";
import PickAddressPopup from "@/components/organisms/popups/checkout/PickAddressPopup";
import BackgroundBlockWrapper from "@/components/wrappers/background-block-wrapper/BackgroundBlockWrapper";
import {FiPlus} from "react-icons/fi";
import ControlledTextInput from "@/components/atoms/inputs/text-input/ControlledTextInput";
import {
    $activeUserAddress,
    $checkoutFirstStepData,
    createOrderDraftFx,
    setCheckoutFirstStepDataEvent
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/model";
import {getDeliveryDateEvent} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/second-step/model";
import {$activeStep, setActiveStepEvent} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/model";
import {desktopCheckoutSteps} from "@/data/deskstopCheckoutSteps";
import {$userCredentials} from "@/app/(customer)/model";
import {$orderToRepeat} from "@/app/(customer)/profile/orders/model";
import {
    convertOrderToFormData
} from "@/app/(customer)/(site)/(inner-pages)/cart/checkout/steps/first-step/DesktopCheckoutFirstStep.utils";

const CheckoutUserDataBlock = () => {

    const userDataInputs: InputPrefilledData[] = [
        {
            labelText: "Имя",
            placeholder: "Введите имя",
            name: "firstName",
        }, {
            labelText: "Фамилия",
            placeholder: "Введите фамилию",
            name: "surname"
        }, {
            labelText: "Телефон",
            placeholder: "+7 (___) ___-__-__",
            inputMask: "+9 (999) 999-99-99",
            name: "phoneNumber"
        }, {
            labelText: "Электронная почта",
            placeholder: "Введите почту",
            name: "email"
        },
    ]

    return (
        <BackgroundBlockWrapper header={"Данные получателя"}>
            {userDataInputs.map((input, key) =>
                <ControlledTextInput {...input} key={key} theme={"filled"}/>
            )}
        </BackgroundBlockWrapper>
    )
}

const CheckoutDeliveryAddressBlock = ({onOpenMobilePopup}: { onOpenMobilePopup: () => void }) => {

    const [isPopupVisible, setPopupVisible] = useState<boolean>(false)
    const [buttonText, setButtonText] = useState<string>('')

    const handleSwitchPopupState = () => setPopupVisible(!isPopupVisible)
    const handleOpenPopup = () => {
        if (window.innerWidth >= 640) {
            setPopupVisible(true)
        } else {
            onOpenMobilePopup()
        }
    }

    const deliveryAddressInputs: InputPrefilledData[] = [
        {
            labelText: "Город",
            placeholder: "Введите город проживания",
            name: "city"
        }, {
            labelText: "Улица",
            placeholder: "Введите название улицы",
            name: "street"
        }, {
            labelText: "Дом / Корпус",
            placeholder: "Введите номер дома",
            name: "houseNumber"
        }, {
            labelText: "Квартира / Офис",
            placeholder: "Введите номер квартиры",
            name: "flatNumber"
        }, {
            labelText: "Подъезд",
            placeholder: "Введите номер подъезда",
            name: "entranceNumber"
        }, {
            labelText: "Этаж",
            placeholder: "Введите этаж",
            name: "floor"
        }
    ]

    useEffect(() => {
        if (window.screen.width >= 640) {
            setButtonText('Выбрать существующий')
        }
    }, []);

    return (
        <React.Fragment>
            {isPopupVisible && <PickAddressPopup
                onClose={handleSwitchPopupState}
            />}
            <BackgroundBlockWrapper
                header={"Адрес доставки"}
                rightContent={
                    <Button
                        text={buttonText}
                        onClick={handleOpenPopup}
                        icon={<FiPlus size={"18px"}/>}
                        buttonType={"SECONDARY"}
                        size={"sm"}
                    />
                }
            >
                {deliveryAddressInputs.map((input, key) =>
                    <ControlledTextInput {...input} theme={"filled"} key={key}/>
                )}
            </BackgroundBlockWrapper>
        </React.Fragment>
    )
}

const DesktopCheckoutFirstStep = (props: { onOpenMobilePopup: () => void }) => {

    const [pickedUserAddress, orderToRepeat] = useUnit([$activeUserAddress, $orderToRepeat])
    const [formData, setFormData] = useUnit([$checkoutFirstStepData, setCheckoutFirstStepDataEvent])
    const [activeStep, setActiveStep] = useUnit([$activeStep, setActiveStepEvent])
    const [userCredentials, createOrderDraft, getDeliveryDate] = useUnit([$userCredentials, createOrderDraftFx, getDeliveryDateEvent])

    const methods = useForm<CreateOrderDraftData>({
        resolver: zodResolver(CreateOrderDraftSchema),
        mode: "onSubmit"
    })

    const {
        handleSubmit, reset,
        formState: {isSubmitting}
    } = methods

    const onSubmit = (formData: FieldValues) => {
        createOrderDraft(formData as CreateOrderDraftData)
            .then(orderId => getDeliveryDate(orderId))
            .then(_ => setActiveStep(desktopCheckoutSteps[activeStep.value + 1]))
        setFormData(formData as CreateOrderDraftData)
    }

    useEffect(() => {
        reset({
            ...formData,
            firstName: userCredentials?.fullName.split(" ")[0],
            surname: userCredentials?.fullName.split(" ")[1],
            phoneNumber: userCredentials?.phoneNumber
        })
    }, [formData, userCredentials])

    useEffect(() => {
        if (pickedUserAddress) {
            reset({...pickedUserAddress?.value})
        }
    }, [pickedUserAddress]);

    useEffect(() => {
        reset({
            ...formData,
            ...pickedUserAddress?.value,
            firstName: userCredentials?.fullName.split(" ")[0],
            surname: userCredentials?.fullName.split(" ")[1],
            phoneNumber: userCredentials?.phoneNumber
        })
    }, []);

    useEffect(() => {
        if (orderToRepeat) {
            const convertedOrder = convertOrderToFormData(orderToRepeat)
            reset({
                houseNumber: convertedOrder?.houseNumber,
                flatNumber: convertedOrder?.flatNumber,
                street: convertedOrder?.street
            })
        }
    }, [orderToRepeat]);

    return (
        <FormProvider {...methods}>
            <Form>
                <CheckoutUserDataBlock/>
                <CheckoutDeliveryAddressBlock {...props}/>
                <Button
                    disabled={isSubmitting}
                    text={isSubmitting ? "Отправка.." : "Далее"}
                    onClick={handleSubmit(onSubmit)}
                    classNames={{button: "sm:w-1/4 w-full"}}
                />
            </Form>
        </FormProvider>
    )

};

export default DesktopCheckoutFirstStep;