import {
  registerPopupDidMountEvent,
  registerUserFx,
  setUserPhoneNumberEvent,
} from "@/components/organisms/popups/authorization/signup-popup/model";
import { useAuthorizationPopup } from "@/components/organisms/popups/authorization/useAuthorizationPopup";
import { RegisterUserData, RegisterUserSchema } from "@/schemas/customer/authorization/RegisterUserSchema";
import { useSmartCaptcha } from "@/utlis/hooks/useSmartCaptcha";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUnit } from "effector-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useSignUpPopup = () => {
  const router = useRouter();

  const [registerUser, setUserPhoneNumber, popupDidMount] = useUnit([
    registerUserFx,
    setUserPhoneNumberEvent,
    registerPopupDidMountEvent,
  ]);

  const { switchPopupState, ...authContext } = useAuthorizationPopup();

  const methods = useForm<RegisterUserData>({
    resolver: zodResolver(RegisterUserSchema),
    mode: "onSubmit",
  });

  const {
    formState: { isSubmitting },
    trigger,
    getValues,
  } = methods;

  const [error, setError] = useState<string>("");

  const [captchaVisible, toggleCaptchaVisible, handleValidateForm, key, resetKey] = useSmartCaptcha<RegisterUserData>(
    ["phoneNumber", "fullName", "password"],
    trigger,
  );

  const onSubmit = () => {
    const formData: RegisterUserData = getValues();
    registerUser(formData)
      .then((_) => {
        switchPopupState("confirmationCode");
        setUserPhoneNumber(formData.phoneNumber);
      })
      .catch(setError);
  };

  const handleRegisterLegalEntity = () => {
    router.push("/register/legal-entity");
    switchPopupState(undefined);
  };

  const handleClick = async () => {
    resetKey();
    await handleValidateForm();
  };

  useEffect(() => {
    popupDidMount();
  }, []);

  return {
    states: { isSubmitting, key, captchaVisible, error, authContext, methods },
    actions: { handleClick, handleRegisterLegalEntity, onSubmit, toggleCaptchaVisible },
  };
};
