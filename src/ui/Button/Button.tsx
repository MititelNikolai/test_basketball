import { FC } from "react";
import IButtonProps from "./IButtonsProps";
import styles from "./Button.module.css";
const Button: FC<IButtonProps> = ({
  text,
  handleClick,
  disabled = false,
  type,
  variant,
}) => {
  const { primaryButtonStyles, secondaryButtonStyles } = styles;
  return (
    <button
      type={type}
      onClick={handleClick}
      className={
        variant === "primary" ? primaryButtonStyles : secondaryButtonStyles
      }
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
