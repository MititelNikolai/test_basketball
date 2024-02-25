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
    handleClick,
    background,
    needMessage = true,
    value,
    setValue,
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
    <>
      {label && <p className={textStyles}>{label}</p>}
      <div className={inputGroup}>
        <input
          value={value}
          name={name}
          onChange={(e) => setValue && setValue(e.target.value)}
          type={showPassword ? "text" : inputType}
          min={inputType === "number" ? 0 : undefined}
          className={inputStyles}
          style={{
            backgroundColor: background === "white" ? "#fff" : undefined,
          }}
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
          <button type='button' onClick={handleClick} className={inputIcon}>
            {children}
          </button>
        )}
      </div>

      {needMessage && <p className={warningStyles}>{inputErrorMessage}</p>}
    </>
  );
};

export default forwardRef(Input);
