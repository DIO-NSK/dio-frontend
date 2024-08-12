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
import {ControlledAddressBlock} from "@/components/organisms/address-block/ControlledAddressBlock";
import ControlledTextArea from "@/components/atoms/inputs/controlled-text-area/ControlledTextArea";
import {getCoordsByLocation} from "@/components/organisms/address-block/AddressBlock.api";
import {useLocation} from "@/utlis/hooks/useLocation";
import {LatLng} from "leaflet";

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
            <ControlledAddressBlock
                buttonText={buttonText}
                onOpenPopup={handleOpenPopup}
                name={'address'}
            />
        </React.Fragment>
    )
}

const CheckoutCommentBlock = () => (
    <BackgroundBlockWrapper header={"Дополнительно"}>
        <ControlledTextArea
            name={'comment'} labelText={'Комментарий к заказу'}
            placeholder={'Комментарий к заказу поможет уточнить данные об адресе доставки и ваших предпочтениях'}
            classNames={{wrapper: 'col-span-full'}}
            theme={'filled'}
        />
    </BackgroundBlockWrapper>
)

const DesktopCheckoutFirstStep = (props: { onOpenMobilePopup: () => void }) => {

    const location = useLocation();
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
        formState: {isSubmitting}, watch, setValue
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
            email: userCredentials?.email,
            firstName: userCredentials?.fullName.split(" ")[0],
            surname: userCredentials?.fullName.split(" ")[1],
            phoneNumber: userCredentials?.phoneNumber
        })
    }, [formData, userCredentials])

    useEffect(() => {
        if (pickedUserAddress) {
            const {address, latitude, longitude} = pickedUserAddress?.value;
            reset({
                address: {address: address, latitude: latitude, longitude: longitude}
            })
        }
    }, [pickedUserAddress]);

    useEffect(() => {
        reset({
            ...formData,
            address: {address: '', latitude: location[0], longitude: location[1]},
            email: userCredentials?.email,
            firstName: userCredentials?.fullName.split(" ")[0],
            surname: userCredentials?.fullName.split(" ")[1],
            phoneNumber: userCredentials?.phoneNumber
        })
    }, []);

    useEffect(() => {
        if (orderToRepeat?.address) {
            getCoordsByLocation(orderToRepeat.address).then((suggestions) => {
                reset({
                    address: {
                        address: suggestions[0].address,
                        latitude: suggestions[0].lat,
                        longitude: suggestions[0].lng
                    }
                })
            });
        }
    }, [orderToRepeat]);

    return (
        <FormProvider {...methods}>
            <Form>
                <CheckoutUserDataBlock/>
                <CheckoutDeliveryAddressBlock {...props}/>
                <CheckoutCommentBlock/>
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