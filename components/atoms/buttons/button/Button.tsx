import { ButtonProps } from "@/types/props/buttons/Button";
import { cn } from "@/utlis/cn";
import { CircularProgress } from "@mui/joy";
import { forwardRef } from "react";
import { createButtonStyles } from "./Button.styles";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { buttonType = "PRIMARY", size = "md", hasSpinner = true, disabled = false, children, ...props }: ButtonProps,
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(createButtonStyles(size, buttonType, disabled, props?.classNames?.button))}
      disabled={disabled}
      {...props}
    >
      <div
        className={cn("flex flex-row items-center gap-2", {
          "gap-[15px]": size === "md",
        })}
      >
        {props.icon}
        {props?.text}
      </div>
      {props?.rightContent}
      {disabled && hasSpinner && <CircularProgress variant="soft" size="sm" />}
    </button>
  ),
);

export default Button;
