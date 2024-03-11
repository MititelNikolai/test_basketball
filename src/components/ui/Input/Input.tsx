import { forwardRef, useState } from "react";
import styles from "./Input.module.css";
import InputProps from "./InputProps";
import { IconCloseEye, IconOpenEye } from "../icons";

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    inputFieldType,
    label,
    errorMessage,
    children,
    placeholder,
    name,
    handleClick,
    background,
    haveMessage = true,
    value,
    setValue,
    ...props
  },
  ref
) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {label && <p className={styles.textStyles}>{label}</p>}
      <div className={styles.inputGroup}>
        <input
          value={value}
          name={name}
          onChange={(e) => setValue && setValue(e.target.value)}
          type={showPassword ? "text" : inputFieldType}
          min={inputFieldType === "number" ? 0 : undefined}
          className={
            children || inputFieldType === "password"
              ? `${styles.inputStyles} ${styles.withIcon}`
              : styles.inputStyles
          }
          style={{
            backgroundColor: background === "white" ? "#fff" : undefined,
            border: errorMessage && "1px solid #FF768E",
          }}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />

        {inputFieldType === "password" ? (
          <button
            type='button'
            className={styles.inputIcon}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <IconOpenEye /> : <IconCloseEye />}
          </button>
        ) : (
          <button
            type='button'
            onClick={handleClick}
            className={styles.inputIcon}
          >
            {children}
          </button>
        )}
      </div>

      {haveMessage && <p className={styles.warningStyles}>{errorMessage}</p>}
    </>
  );
};

export default forwardRef(Input);
