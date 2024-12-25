import Button from "@/components/atoms/buttons/button/Button";
import LikeButton from "@/components/atoms/buttons/like-button/LikeButton";
import BuyButton from "@/components/mobile/moleculas/buy-button/BuyButton";
import { chakra } from "@chakra-ui/react";
import { useEffect } from "react";
import { useProductCardFooter } from "./Footer.hooks";

const Container = chakra.footer;

export const Footer = () => {
  const {
    states: { isLiked, buttonIcon, buttonText, isInCart, disabled },
    actions: { toggleLike, onBuyClick },
  } = useProductCardFooter();

  return (
    <Container className="flex flex-row items-center gap-3 md:gap-5">
      <Button
        buttonType={isInCart ? "PRIMARY" : "SECONDARY"}
        classNames={{ button: "hidden md:flex" }}
        onClick={onBuyClick}
        disabled={disabled}
        hasSpinner={false}
        text={buttonText}
        icon={buttonIcon}
      />
      <LikeButton toggleLike={toggleLike} isLiked={isLiked} />
      <BuyButton isInCart={isInCart} onClick={onBuyClick} />
    </Container>
  );
};
