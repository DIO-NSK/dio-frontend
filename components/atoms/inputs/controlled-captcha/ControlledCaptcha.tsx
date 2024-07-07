'use client'

import React from 'react';
import {Controller} from "react-hook-form";
import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import {InvisibleSmartCaptcha} from "@yandex/smart-captcha";

const siteKey = String(process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_SITEKEY);

type ControlledCaptchaProps = {
    visible : boolean;
    onChallengeHidden : () => void;
    onSuccess : () => void;
}

const ControlledCaptcha = ({visible, onChallengeHidden, onSuccess} : ControlledCaptchaProps) => (
    <ConnectForm>
        {({control}) => (
            <Controller
                name={'captchaToken'}
                control={control}
                render={({field : {onChange}}) => (
                    <InvisibleSmartCaptcha
                        sitekey={siteKey}
                        onChallengeHidden={onChallengeHidden}
                        onSuccess={(token) => {
                            onChange(token);
                            onSuccess();
                        }}
                        visible={visible}
                        hideShield={true}
                    />
                )}
            />
        )}
    </ConnectForm>
)

export default ControlledCaptcha;
