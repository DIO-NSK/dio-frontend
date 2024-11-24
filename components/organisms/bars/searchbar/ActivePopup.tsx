import ChangePasswordPopup from "@/components/organisms/popups/authorization/change-password-popup/ChangePasswordPopup";
import ConfirmationCodeByPhonePopup from "@/components/organisms/popups/authorization/confirmation-code-popup/by-phone/ConfirmationCodeByPhonePopup";
import ConfirmationCodePopup from "@/components/organisms/popups/authorization/confirmation-code-popup/user/ConfirmationCodePopup";
import ForgotPasswordPopup from "@/components/organisms/popups/authorization/forgot-password-popup/ForgotPasswordPopup";
import LoginByPhonePopup from "@/components/organisms/popups/authorization/login-by-phone-popup/LoginByPhonePopup";
import LoginPopup from "@/components/organisms/popups/authorization/login-popup/LoginPopup";
import SignUpPopup from "@/components/organisms/popups/authorization/signup-popup/SignUpPopup";
import SuccessPopup from "@/components/organisms/popups/authorization/success-popup/SuccessPopup";
import { useSearchbar } from "./Searchbar.hooks";

export const ActivePopup = () => {
  const { popupState } = useSearchbar();

  switch (popupState) {
    case "login":
      return <LoginPopup />;
    case "signup":
      return <SignUpPopup />;
    case "forgotPassword":
      return <ForgotPasswordPopup />;
    case "confirmationCode":
      return <ConfirmationCodePopup />;
    case "confirmationCodeByPhone":
      return <ConfirmationCodeByPhonePopup />;
    case "loginByPhone":
      return <LoginByPhonePopup />;
    case "changePassword":
      return <ChangePasswordPopup />;
    case "success":
      return <SuccessPopup />;
  }
};
