"use client";

import ConnectForm from "@/components/organisms/forms/connect-form/ConnectForm";
import { InvisibleSmartCaptcha } from "@yandex/smart-captcha";
import { Controller } from "react-hook-form";
import { SITEKEY } from "./ControlledCaptcha.constants";
import { ControlledCaptchaProps } from "./ControlledCaptcha.types";

const ControlledCaptcha = ({ visible, onChallengeHidden, onSuccess }: ControlledCaptchaProps) => (
  <ConnectForm>
    {({ control }) => (
      <Controller
        name="captchaToken"
        control={control}
        render={({ field: { onChange } }) => (
          <InvisibleSmartCaptcha
            onChallengeHidden={onChallengeHidden}
            visible={visible}
            hideShield={true}
            sitekey={SITEKEY}
            onSuccess={(token) => {
              onChange(token);
              onSuccess();
            }}
          />
        )}
      />
    )}
  </ConnectForm>
);

export default ControlledCaptcha;
