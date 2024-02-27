import { forwardRef } from "react";
import styles from "./CheckBox.module.css";
interface ICheckBoxProps {
  name: string;
  text: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
}
const CheckBox: React.ForwardRefRenderFunction<
  HTMLInputElement,
  ICheckBoxProps
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
            <span className={`${checkboxInput} ${checkboxDisabled}`}>
              <svg
                className={checkSvg}
                width='6'
                height='6'
                viewBox='0 0 6 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M2.64624 5.39625C2.45124 5.59125 2.13624 5.59125 1.94124 5.39625L0.146243 3.60125C0.0526164 3.50783 0 3.38101 0 3.24875C0 3.11649 0.0526164 2.98967 0.146243 2.89625C0.341243 2.70125 0.656243 2.70125 0.851243 2.89625L2.29124 4.33625L5.73124 0.89625C5.92624 0.70125 6.24124 0.70125 6.43624 0.89625C6.63124 1.09125 6.63124 1.40625 6.43624 1.60125L2.64624 5.39625Z'
                  fill='white'
                />
              </svg>
            </span>
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
              <svg
                className={checkSvg}
                width='6'
                height='6'
                viewBox='0 0 6 6'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M2.64624 5.39625C2.45124 5.59125 2.13624 5.59125 1.94124 5.39625L0.146243 3.60125C0.0526164 3.50783 0 3.38101 0 3.24875C0 3.11649 0.0526164 2.98967 0.146243 2.89625C0.341243 2.70125 0.656243 2.70125 0.851243 2.89625L2.29124 4.33625L5.73124 0.89625C5.92624 0.70125 6.24124 0.70125 6.43624 0.89625C6.63124 1.09125 6.63124 1.40625 6.43624 1.60125L2.64624 5.39625Z'
                  fill='white'
                />
              </svg>
            </span>
          </label>
          <p className={checkboxErrorText}>{errorText}</p>
        </>
      )}
    </div>
  );
};

export default forwardRef(CheckBox);
