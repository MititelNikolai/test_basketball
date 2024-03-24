import { forwardRef } from "react";
import { CheckBoxProps } from "./CheckBoxProps";
import { IconCheck } from "../icons";
import styles from "./CheckBox.module.css";

const CheckBox: React.ForwardRefRenderFunction<
  HTMLInputElement,
  CheckBoxProps
> = ({ text, name, disabled, error, errorText, ...props }, ref) => {
  const {
    checkboxContainer,
    checkboxDisabled,
    checkboxError,
    checkboxErrorText,
    checkboxInput,
    checkSvg,
  } = styles;

  return (
    <div>
      {disabled ? (
        <>
          <label className={`${checkboxContainer} ${checkboxDisabled}`}>
            {text}
            <input
              type='checkbox'
              disabled={disabled}
              name={name}
              ref={ref}
              {...props}
            />
            <span className={`${checkboxInput} ${checkboxDisabled}`}></span>
          </label>
        </>
      ) : (
        <>
          <label
            className={
              errorText
                ? `${checkboxContainer} ${checkboxError}`
                : `${checkboxContainer} `
            }
          >
            {text}
            <input
              type='checkbox'
              disabled={disabled}
              name={name}
              ref={ref}
              {...props}
            />
            <span
              className={
                errorText
                  ? `${checkboxInput} ${checkboxError}`
                  : `${checkboxInput} `
              }
            >
              <IconCheck className={checkSvg} />
            </span>
          </label>
          <p className={checkboxErrorText}>{errorText}</p>
        </>
      )}
    </div>
  );
};

export default forwardRef(CheckBox);
