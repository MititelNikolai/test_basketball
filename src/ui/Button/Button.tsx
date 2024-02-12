import { FC } from "react";
import IButtonProps from "./IButtonsProps";
import styles from "./Button.module.css";
const Button: FC<IButtonProps> = ({
  text,
  handleClick,
  disabled = false,
  type,
  variant,
  textWithPlus,
}) => {
  const { primaryButtonStyles, secondaryButtonStyles, plusWrapper } = styles;
  return (
    <button
      type={type}
      onClick={handleClick}
      className={
        variant === "primary" ? primaryButtonStyles : secondaryButtonStyles
      }
      disabled={disabled}
    >
      {textWithPlus ? (
        <div className={plusWrapper}>
          <p>{text}</p>
          <p>+</p>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
