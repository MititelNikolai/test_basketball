import { forwardRef, useState } from "react";
import styles from "./Input.module.css";
import IPropsInput from "./IPropsInput";
import IconCloseEye from "../icons/IconCloseEye";
import IconOpenEye from "../icons/IconOpenEye";
const Input: React.ForwardRefRenderFunction<HTMLInputElement, IPropsInput> = (
  {
    inputType,
    label,
    inputErrorMessage,
    children,
    placeholder,
    name,
    ...props
  },
  ref
) => {
  const {
    inputStyles,
    textStyles,
    /* errorStyle, */
    warningStyles,
    inputGroup,
    inputIcon,
  } = styles;

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <p className={textStyles}>{label}</p>
      <div className={inputGroup}>
        <input
          name={name}
          type={showPassword ? "text" : inputType}
          className={`${inputStyles}`}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />

        {inputType === "password" ? (
          <button
            type='button'
            className={inputIcon}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IconOpenEye /> : <IconCloseEye />}
          </button>
        ) : (
          <button type='button' className={inputIcon}>
            {children}
          </button>
        )}
      </div>
      <p className={warningStyles}>{inputErrorMessage}</p>
    </div>
  );
};

export default forwardRef(Input);
