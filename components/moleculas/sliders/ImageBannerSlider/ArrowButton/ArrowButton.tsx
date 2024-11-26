import { ButtonProps } from "@/types/props/buttons/Button";
import { cn } from "@/utlis/cn";
import { buttonCV } from "./ArrowButton.styles";

export const ArrowButton = ({ onClick, icon }: ButtonProps) => (
  <button onClick={onClick} className={cn(buttonCV)}>
    {icon}
  </button>
);
