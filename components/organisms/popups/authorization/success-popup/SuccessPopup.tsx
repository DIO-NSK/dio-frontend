import React from 'react';
import Text from "@/components/atoms/text/text-base/Text";
import Button from "@/components/atoms/buttons/button/Button";
import PopupWrapper from "@/components/wrappers/popup-wrapper/PopupWrapper";
import SuccessCartIcon from "@/components/atoms/svg/success-cart-icon/SuccessCartIcon";

const SuccessPopup = () => {

    const handleClosePopup = () => console.log("Go to market")

    return (
        <PopupWrapper>
            <div className={"rounded-xl p-3 bg-white flex flex-row items-center gap-10"}>
                <SuccessCartIcon/>
                <div className={"flex flex-col gap-5"}>
                    <Text text={"Регистрация прошла успешно!"} className={"text-lg font-medium"}/>
                    <Button text={"Перейти к покупкам"} onClick={handleClosePopup}/>
                </div>
            </div>
        </PopupWrapper>
    );

};

export default SuccessPopup;
