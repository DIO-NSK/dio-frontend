import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ArrowButton } from "../ArrowButton/ArrowButton";
import { Container } from "./Switcher.styles";
import { SwitcherProps } from "./Switcher.types";

export const Switcher = ({ onBack, onNext }: SwitcherProps) => (
  <Container>
    <ArrowButton icon={<FiChevronLeft size={"20px"} />} onClick={onBack} />
    <ArrowButton icon={<FiChevronRight size={"20px"} />} onClick={onNext} />
  </Container>
);
