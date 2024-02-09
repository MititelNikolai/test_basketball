import { ReactNode } from "react";

interface IPropsInput {
  inputType: string;
  label: string;
  name?: string;
  inputErrorMessage?: string;
  children?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
}

export default IPropsInput;
